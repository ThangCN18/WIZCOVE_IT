import { BaseMail } from 'src/mails/base/base-email';
import { UserEntity } from '../entities/user.entity';

export class VerifyEmail extends BaseMail {
  constructor(private user: UserEntity, private verifyLink: string) {
    super();
  }

  get subject(): string {
    return 'Verify your email address';
  }

  get template(): string {
    return 'verify-email';
  }

  get context() {
    return {
      firstName: this.user.firstName,
      verifyLink: this.verifyLink,
    };
  }

  get to(): string {
    return this.user.email;
  }
}
