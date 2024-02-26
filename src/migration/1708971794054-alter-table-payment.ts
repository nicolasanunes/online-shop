import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePayment1708971794054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      ALTER TABLE public.payment ALTER COLUMN amount_payments drop not null;
      ALTER TABLE public.payment ALTER COLUMN code drop not null;
      ALTER TABLE public.payment ALTER COLUMN date_payment drop not null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
