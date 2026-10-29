import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnasDireccionCapacidadRecinto1793313756431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE recinto ADD COLUMN direccion VARCHAR(300)`);
        await queryRunner.query(`ALTER TABLE recinto ADD COLUMN capacidad INT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE recinto DROP COLUMN capacidad`);
        await queryRunner.query(`ALTER TABLE recinto DROP COLUMN direccion`);
    }

}
