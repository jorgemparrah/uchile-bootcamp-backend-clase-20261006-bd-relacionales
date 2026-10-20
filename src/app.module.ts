import { Module } from '@nestjs/common';
import { RecintoController } from './recinto.controller';
import { RecintoService } from './recinto.service';
import { ConfigModule } from '@nestjs/config';
import { ConexionMysql } from './conexion.mysql';
import { RecintoRepository } from './recinto.repository';
import { ConexionPostgres } from './conexion.postgres';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [RecintoController],
  providers: [ConexionMysql, ConexionPostgres, RecintoService, RecintoRepository],
})
export class AppModule {}
