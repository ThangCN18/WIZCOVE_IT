import { ISendMailOptions } from '@nestjs-modules/mailer';

export class BaseMail implements ISendMailOptions {
  get subject(): string {
    return;
  }

  get to(): string | string[] {
    return;
  }

  get from(): string {
    return;
  }

  get template(): string {
    return;
  }

  get context(): Record<string, any> {
    return;
  }

  get options(): {} {
    return;
  }
}
