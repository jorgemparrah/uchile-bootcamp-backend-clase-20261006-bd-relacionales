import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaEvento1793140986248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE evento (
            id INT PRIMARY KEY,
            nombre varchar(100) NOT NULL,
            fecha date NOT NULL,
            capacidad INT DEFAULT NULL,
            activo BOOLEAN NOT NULL,
            recinto_id INT,
            CONSTRAINT fk_eventos_recinto
                FOREIGN KEY (recinto_id)
                REFERENCES recinto(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE evento;
        `);
    }

}
