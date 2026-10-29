import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadController } from './actividad.controller';
import { ActividadService } from './actividad.service';
import { Actividad } from './entities/actividad.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad, Usuario])],
  controllers: [ActividadController],
  providers: [ActividadService],
})
export class ActividadModule {}
