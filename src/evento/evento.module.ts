import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';
import { Recinto } from 'src/recinto/entities/recinto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Recinto])],
  controllers: [EventoController],
  providers: [EventoService],
})
export class EventoModule {}
