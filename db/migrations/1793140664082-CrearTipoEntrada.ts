import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTipoEntrada1793140664082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tipo_entrada (
                id INT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE tipo_entrada;
        `);
    }

}
