import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from '../product/product.service';
import { OrderProductEntity } from '../order-product/entities/order-product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';

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

  async saveOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
    payment: PaymentEntity,
  ): Promise<OrderEntity> {
    return this.orderRepository.save({
      addressId: createOrderDto.addressId,
      date: new Date(),
      paymentId: payment.id,
      userId,
    });
  }

  async createOrderProductUsingCart(
    cart: CartEntity,
    orderId: number,
    products: ProductEntity[],
  ): Promise<OrderProductEntity[]> {
    return Promise.all(
      cart.productCart?.map((productCart) =>
        this.orderProductService.createOrderProduct(
          productCart.productId,
          orderId,
          products.find((product) => product.id === productCart.productId)
            ?.price || 0,
          productCart.amount,
        ),
      ),
    );
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<OrderEntity> {
    const cart = await this.cartService.findCartByUserId(userId, true);

    const products = await this.productService.listAllProducts(
      cart.productCart?.map((productCart) => productCart.productId),
    );

    const payment: PaymentEntity = await this.paymentService.createPayment(
      createOrderDto,
      products,
      cart,
    );

    const order = await this.saveOrder(createOrderDto, userId, payment);

    await this.createOrderProductUsingCart(cart, order.id, products);

    await this.cartService.clearCart(userId);

    return order;
  }

  async findOrdersByUserId(
    userId?: number,
    orderId?: number,
  ): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      where: {
        userId,
        id: orderId,
      },
      relations: {
        address: {
          city: {
            state: true,
          },
        },
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
        user: !!orderId,
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found');
    }

    return orders;
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      relations: {
        user: true,
      },
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('Orders not found');
    }

    const ordersProduct =
      await this.orderProductService.findAmountProductsByOrderId(
        orders.map((order) => order.id),
      );

    return orders.map((order) => {
      const orderProduct = ordersProduct.find(
        (currentOrder) => currentOrder.order_id === order.id,
      );

      if (ordersProduct) {
        return {
          ...order,
          amountProducts: Number(orderProduct.total),
        };
      }

      return order;
    });
  }
}
