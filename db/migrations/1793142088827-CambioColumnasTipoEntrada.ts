import { MigrationInterface, QueryRunner } from "typeorm";

export class CambioColumnasTipoEntrada1793142088827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE tipo_entrada
            ADD COLUMN nombre_comercial VARCHAR(255) NOT NULL;
        `);
        await queryRunner.query(`
            UPDATE tipo_entrada
            SET nombre_comercial = nombre;
        `);
        await queryRunner.query(`
            UPDATE tipo_entrada
            SET nombre = 'grupo1' WHERE nombre_comercial = 'General';
        `);
        await queryRunner.query(`
            UPDATE tipo_entrada
            SET nombre = 'grupo2' WHERE nombre_comercial = 'Premium';
        `);
        await queryRunner.query(`
            UPDATE tipo_entrada
            SET nombre = 'grupo3' WHERE nombre_comercial = 'VIP';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE tipo_entrada
            SET nombre = nombre_comercial;
        `);
        await queryRunner.query(`
            ALTER TABLE tipo_entrada
            DROP COLUMN nombre_comercial;
        `);
    }

}
