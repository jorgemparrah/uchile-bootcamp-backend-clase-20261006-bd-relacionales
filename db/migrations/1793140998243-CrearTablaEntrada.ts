import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablaEntrada1793140998243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            
            CREATE TABLE entrada (
            evento_id INT,
            tipo_entrada_id INT,
            precio INT,

            PRIMARY KEY (evento_id, tipo_entrada_id),

            CONSTRAINT fk_entrada_evento
                FOREIGN KEY (evento_id)
                REFERENCES evento(id),

            CONSTRAINT fk_entrada_tipo_entrada
                FOREIGN KEY (tipo_entrada_id)
                REFERENCES tipo_entrada(id)
            );


        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE entrada;
        `);
    }

}
