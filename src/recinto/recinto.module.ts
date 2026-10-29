import { Module } from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { RecintoController } from './recinto.controller';
import { Recinto } from './entities/recinto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from 'src/evento/entities/evento.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Recinto, Evento])],
  controllers: [RecintoController],
  providers: [RecintoService],
})
export class RecintoModule {}
