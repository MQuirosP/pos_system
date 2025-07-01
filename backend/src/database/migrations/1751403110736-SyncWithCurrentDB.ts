import { MigrationInterface, QueryRunner } from "typeorm";

export class SyncWithCurrentDB1751403110736 implements MigrationInterface {
    name = 'SyncWithCurrentDB1751403110736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_blacklist" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "blacklisted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3e37528d03f0bd5335874afa48d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" SERIAL NOT NULL, "category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_name"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_items_status_enum" AS ENUM('completed', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD "status" "public"."purchase_items_status_enum" NOT NULL DEFAULT 'completed'`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "payment_method"`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_payment_method_enum" AS ENUM('credit_card', 'cash', 'bank_transfer')`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "payment_method" "public"."purchases_payment_method_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "UQ_75a5a4fdf5b2a0c149d20b229c6" UNIQUE ("doc_number")`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."purchases_status_enum" AS ENUM('completed', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "status" "public"."purchases_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."purchases_status_enum"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "UQ_75a5a4fdf5b2a0c149d20b229c6"`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TYPE "public"."purchases_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD "payment_method" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase_items" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_items_status_enum"`);
        await queryRunner.query(`ALTER TABLE "purchase_items" ADD "status" character varying NOT NULL DEFAULT 'completed'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "token_blacklist"`);
    }

}
