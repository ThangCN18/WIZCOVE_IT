import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { EditProfileDto } from '../dto/edit-profile.dto';
import { QueryParamsFilterDto } from '../../core/dto/query-params-filter.dto';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  findOne(options: FindOneOptions<UserEntity>) {
    return this.userRepo.findOne(options);
  }

  getUser(id: string) {
    return this.userRepo.findOneOrFail({ id });
  }

  getUsers(query: QueryParamsFilterDto) {
    return this.userRepo.filter(query);
  }

  findOneOrFail(options: FindOneOptions<UserEntity>) {
    return this.userRepo.findOneOrFail(options);
  }

  changePass(userId: string, body: ChangePasswordDto) {
    return this.userRepo.update(
      { id: userId },
      { password: bcrypt.hashSync(body.newPassword, 10) },
    );
  }

  editProfile(userId: string, body: EditProfileDto) {
    return this.userRepo.update({ id: userId }, body);
  }

  updateActive(id: string) {
    return this.userRepo.update({ id }, { isActive: false });
  }

  remove(id: string) {
    return this.userRepo.softDelete({ id });
  }
}
