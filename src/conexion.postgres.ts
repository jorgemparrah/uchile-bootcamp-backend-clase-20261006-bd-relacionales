import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ConexionPostgres {

  pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_NAME,
    });
  }

}
