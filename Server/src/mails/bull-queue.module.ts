import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullQueueService } from './services/bull-queue.service';
import { MailsProcessor } from './processors/mails.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'mails' })],
  providers: [BullQueueService, MailsProcessor],
  exports: [BullQueueService, MailsProcessor],
})
export class BullQueueModule {}
