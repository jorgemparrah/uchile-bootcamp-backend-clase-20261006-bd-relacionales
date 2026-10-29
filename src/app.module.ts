import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadModule } from './actividad/actividad.module';
import { CompraModule } from './compra/compra.module';
import { EntradaModule } from './entrada/entrada.module';
import { EventoModule } from './evento/evento.module';
import { RecintoModule } from './recinto/recinto.module';
import { TipoEntradaModule } from './tipo_entrada/tipo_entrada.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //* 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT3!, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_NAME,
      autoLoadEntities: true,
      // synchronize: true,
    }),
    RecintoModule,
    EventoModule,
    TipoEntradaModule,
    EntradaModule,
    UsuarioModule,
    ActividadModule,
    CompraModule,
    /*/
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_NAME,
      autoLoadEntities: true,
    }),
    //*/
  ],
})
export class AppModule {}
