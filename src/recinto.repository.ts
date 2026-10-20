import { Injectable } from '@nestjs/common';
import { ConexionMysql } from './conexion.mysql';
import { ConexionPostgres } from './conexion.postgres';

@Injectable()
export class RecintoRepository {

  constructor(private readonly conexion: ConexionMysql) {}
  // constructor(private readonly conexion: ConexionPostgres) {}

  async findAll(): Promise<any> {
    const prueba = await this.conexion.pool.query('SELECT * FROM recinto');
    if (prueba.rows) {
      return prueba.rows;
    }
    return prueba[0];
  }

  async findById(id: string): Promise<any> {
    const prueba = await this.conexion.pool.query(`SELECT * FROM recinto WHERE id = ?`, [ id ]);
    // const prueba = await this.conexion.pool.query(`SELECT * FROM recinto WHERE id = $1`, [ id ]);
    if (prueba.rows) {
      const resultado = prueba.rows;
      if (resultado.length === 0) {
        throw new Error(`Recinto with id ${id} not found`);
      }
      return resultado;
    }
    const resultado = prueba[0];
    if (resultado.length === 0) {
      throw new Error(`Recinto with id ${id} not found`);
    }
    return resultado;
  }

}
