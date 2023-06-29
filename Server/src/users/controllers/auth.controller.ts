import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { Controller, Post, Body, HttpCode, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user-current.decorator';
import { TokenEntity } from '../entities/token.entity';
import { EmailDto } from '../dto/email.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Put('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  verifyEmail(@Body() body: VerifyTokenDto) {
    return this.authService.verify(body.token);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(RefreshTokenGuard)
  refreshTokens(@CurrentUser('refreshToken') tokenEntity: TokenEntity) {
    return this.authService.refreshTokens(tokenEntity.token);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(RefreshTokenGuard)
  logout(@CurrentUser('refreshToken') tokenEntity: TokenEntity) {
    return this.authService.logout(tokenEntity.token);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  forgotPass(@Body() body: EmailDto) {
    return this.authService.forgotPass(body.email);
  }

  @Put('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPass(@Body() body: ResetPasswordDto) {
    return this.authService.resetPass(body);
  }
}
