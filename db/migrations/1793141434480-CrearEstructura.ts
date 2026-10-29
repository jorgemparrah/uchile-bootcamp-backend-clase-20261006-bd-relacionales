import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearEstructura1793141434480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE usuario (
            id VARCHAR(64) PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            correo VARCHAR(100) UNIQUE NOT NULL,
            clave VARCHAR(100) NOT NULL,
            activo BOOLEAN NOT NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE actividad (
            id INT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            evento_id INT,

            CONSTRAINT fk_actividad_evento
                FOREIGN KEY (evento_id)
                REFERENCES evento(id)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE inscripcion (
            usuario_id VARCHAR(64),
            actividad_id INT,

            PRIMARY KEY (usuario_id, actividad_id),

            CONSTRAINT fk_inscripcion_usuario
                FOREIGN KEY (usuario_id)
                REFERENCES usuario(id),

            CONSTRAINT fk_inscripcion_actividad
                FOREIGN KEY (actividad_id)
                REFERENCES actividad(id)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE compra (
            id INT PRIMARY KEY,
            usuario_id VARCHAR(64),
            evento_id INT,
            tipo_entrada_id INT,
            fecha DATE,

            CONSTRAINT fk_compra_usuario
                FOREIGN KEY (usuario_id)
                REFERENCES usuario(id),

            CONSTRAINT fk_compra_entrada
                FOREIGN KEY (evento_id, tipo_entrada_id)
                REFERENCES entrada(evento_id, tipo_entrada_id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE compra;
        `);
        await queryRunner.query(`
            DROP TABLE inscripcion;
        `);
        await queryRunner.query(`
            DROP TABLE actividad;
        `);
        await queryRunner.query(`
            DROP TABLE usuario;
        `);
    }

}
