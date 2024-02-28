import { ListPaymentStatusDto } from '../../payment-status/dto/list-payment-status.dto';
import { PaymentEntity } from '../entities/payment.entity';

export class ListPaymentDto {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: ListPaymentStatusDto;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new ListPaymentStatusDto(payment.paymentStatus)
      : undefined;
  }
}
