import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaRecinto1793139368047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE recinto (
                id INT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE recinto;
        `);
    }

}
