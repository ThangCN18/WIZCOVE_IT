import { MailerService } from '@nestjs-modules/mailer';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('mails')
export class MailsProcessor {
  constructor(private mailerService: MailerService) {}

  @Process('add-to-queue')
  addToQueue(job: Job) {
    const { options } = job.data;
    return this.mailerService.sendMail(options);
  }
}
