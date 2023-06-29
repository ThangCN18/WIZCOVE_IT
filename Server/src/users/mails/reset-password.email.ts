import { BaseMail } from 'src/mails/base/base-email';
import { UserEntity } from '../entities/user.entity';

export class ResetPasswordEmail extends BaseMail {
  constructor(private user: UserEntity, private resetLink: string) {
    super();
  }

  get subject(): string {
    return 'Reset your iom-grievance password';
  }

  get template(): string {
    return 'reset-password';
  }

  get context() {
    return {
      firstName: this.user.firstName,
      resetLink: this.resetLink,
    };
  }

  get to(): string {
    return this.user.email;
  }
}
