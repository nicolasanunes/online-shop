import { PaymentStatusEntity } from '../entities/payment_status.entity';

export class ListPaymentStatusDto {
  id: number;
  name: string;

  constructor(paymentStatus: PaymentStatusEntity) {
    this.id = paymentStatus.id;
    this.name = paymentStatus.name;
  }
}
