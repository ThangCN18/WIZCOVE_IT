import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { SignUpDto } from '../dto/sign-up.dto';
import { env } from '../../config/env.config';
import { UserEntity } from '../entities/user.entity';
import { TokenRepository } from '../repositories/token.repository';
import { LoginDto } from '../dto/login.dto';
import { isExpired } from 'src/core/helpers/time.helper';
import { VerifyEmail } from '../mails/verify.email';
import { BullQueueService } from '../../mails/services/bull-queue.service';
import { ResetPasswordEmail } from '../mails/reset-password.email';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private tokenRepo: TokenRepository,
    private jwtService: JwtService,
    private bullQueueService: BullQueueService,
  ) {}

  async signUp(body: SignUpDto) {
    const isExistsEmail = await this.userRepo.findOne({
      where: { email: body.email },
    });
    if (isExistsEmail) {
      throw new BadRequestException('Email already exists');
    }
    const user = await this.createUser(body);
    const token = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      env.JWT.REFRESH_TOKEN,
    );
    await this.tokenRepo.save({
      token,
      userId: user.id,
      expireAt: await (this.jwtService.decode(token) as any).exp,
    });

    const verifyLink = `${env.WEB_URL}/verify-email?token=${token}`;

    await this.sendVerifyEmail(user, verifyLink);
    delete user.password;
    return { isSentMail: !!user, user };
  }

  async createLoginResult(user: UserEntity) {
    const { accessToken, refreshToken, expireAt } = await this.generateTokens(
      user,
    );
    await this.tokenRepo.save({
      token: refreshToken,
      userId: user.id,
      expireAt,
    });
    delete user.password;
    return { user, accessToken, refreshToken };
  }

  async createUser(body: SignUpDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.userRepo.save({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
    });
  }

  async login(body: LoginDto) {
    const user = await this.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException(
        'Your email address or password are incorrect.',
      );
    }
    if (!user.isVerified) {
      throw new BadRequestException('Account not verified yet.');
    }
    return this.createLoginResult(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshTokens(token: string) {
    const tokenDb = await this.tokenRepo.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!token) {
      throw new BadRequestException('Token is invalid');
    }
    if (isExpired(tokenDb.expireAt)) {
      await tokenDb.remove();
      throw new BadRequestException('Token is expired');
    }
    const { accessToken, refreshToken, expireAt } = await this.generateTokens(
      tokenDb.user,
    );
    await this.tokenRepo.save({
      token: refreshToken,
      expireAt,
      userId: tokenDb.userId,
    });
    await tokenDb.remove();
    return { accessToken, refreshToken };
  }

  async verify(verifyToken: string) {
    const userId = await (this.jwtService.decode(verifyToken) as any).id;
    const token = await this.tokenRepo.findOne({
      where: { token: verifyToken, userId },
      relations: ['user'],
    });

    if (!token || isExpired(token.expireAt) || token.user.isVerified) {
      throw new BadRequestException('Token is invalid or expired');
    }
    await this.userRepo.update({ id: token.userId }, { isVerified: true });
    return await token.remove();
  }

  async logout(refreshToken: string) {
    const userId = await (this.jwtService.decode(refreshToken) as any).id;
    const token = await this.tokenRepo.findOne({ token: refreshToken, userId });
    if (!token) {
      throw new BadRequestException('Token is invalid or expired');
    }
    return token.remove();
  }

  async generateTokens(user: UserEntity) {
    const accessToken = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      env.JWT.ACCESS_TOKEN,
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      env.JWT.REFRESH_TOKEN,
    );
    const expireAt = await (this.jwtService.decode(refreshToken) as any).exp;

    return { accessToken, refreshToken, expireAt };
  }

  sendVerifyEmail(user: UserEntity, verifyLink: string) {
    return this.bullQueueService.addToQueue(new VerifyEmail(user, verifyLink));
  }

  async forgotPass(email: string) {
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new BadRequestException('Email address is not exist');
    }
    const token = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      { secret: env.JWT.ACCESS_TOKEN.secret, expiresIn: '1d' },
    );

    await this.tokenRepo.save({
      token,
      userId: user.id,
      expireAt: await (this.jwtService.decode(token) as any).exp,
    });

    const resetLink = `${env.WEB_URL}/reset-password?token=${token}`;

    await this.sendResetPass(user, resetLink);
    delete user.password;
    return { isSentMail: !!user, user };
  }

  async resetPass(body: ResetPasswordDto) {
    const userId = await (this.jwtService.decode(body.token) as any).id;
    const tokenDb = await this.tokenRepo.findOneOrFail({
      where: { token: body.token, userId },
    });
    if (!tokenDb || isExpired(tokenDb.expireAt)) {
      throw new BadRequestException('Token is invalid or expired');
    }
    await this.userRepo.update(
      { id: userId },
      { password: bcrypt.hashSync(body.password, 10) },
    );
  }

  sendResetPass(user: UserEntity, resetLink: string) {
    return this.bullQueueService.addToQueue(
      new ResetPasswordEmail(user, resetLink),
    );
  }
}
