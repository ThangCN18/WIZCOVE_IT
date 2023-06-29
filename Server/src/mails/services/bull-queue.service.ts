import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { BaseMail } from '../base/base-email';
import { ISendMailOptions } from '@nestjs-modules/mailer';

@Injectable()
export class BullQueueService {
  constructor(@InjectQueue('mails') private readonly mailsQueue: Queue) {}

  async addToQueue(mail: BaseMail): Promise<void> {
    const options: ISendMailOptions = {
      subject: mail.subject,
      template: mail.template,
      context: mail.context,
      to: mail.to,
    };
    await this.mailsQueue.add(
      'add-to-queue',
      { options },
      { preventParsingData: false, removeOnComplete: true },
    );
  }
}
