import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderProductService: OrderProductService,
    private readonly productService: ProductService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<OrderEntity> {
    const payment: PaymentEntity =
      await this.paymentService.createPayment(createOrderDto);

    const order = await this.orderRepository.save({
      addressId: createOrderDto.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });

    const cart = await this.cartService.findCartByUserId(userId, true);

    const products = await this.productService.listAllProducts(
      cart.productCart?.map((productCart) => productCart.productId),
    );

    await Promise.all(
      cart.productCart?.map((productCart) =>
        this.orderProductService.createOrderProduct(
          productCart.productId,
          order.id,
          products.find((product) => product.id === productCart.productId)
            ?.price || 0,
          productCart.amount,
        ),
      ),
    );

    return order;
  }
}
