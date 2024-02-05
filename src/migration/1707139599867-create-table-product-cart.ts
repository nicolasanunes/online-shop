import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductCart1707139599867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.product_cart (
            id integer NOT NULL,
            cart_id integer NOT NULL,
            product_id integer NOT NULL,
            amount integer NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (cart_id) references public.cart(id),
            foreign key (product_id) references public.product(id)
        );
        
        CREATE SEQUENCE public.product_cart_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
        
        ALTER SEQUENCE public.product_cart_id_seq OWNED BY public.product_cart.id;
        
        ALTER TABLE ONLY public.product_cart ALTER COLUMN id SET DEFAULT nextval('public.product_cart_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLEpublic.product_cart;
    `);
  }
}
