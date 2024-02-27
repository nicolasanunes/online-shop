import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { CreateOrderDto } from '../../order/dto/create-order.dto';

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDto: CreateOrderDto,
  ) {
    super(statusId, price, discount, finalPrice);
    this.amountPayments = createOrderDto?.amountPayments || 0;
  }
}
