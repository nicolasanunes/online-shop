import { ProductCartEntity } from '../../product-cart/entities/product-cart.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderProductEntity } from '../../order-product/entities/order-product.entity';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'image', nullable: false })
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProductCartEntity, (productCart) => productCart.product)
  productCart?: ProductCartEntity[];

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
  )
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: CategoryEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  ordersProduct?: OrderProductEntity[];
}
