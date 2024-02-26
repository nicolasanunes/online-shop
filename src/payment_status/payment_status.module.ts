import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';

@Module({
  providers: [PaymentStatusService]
})
export class PaymentStatusModule {}
