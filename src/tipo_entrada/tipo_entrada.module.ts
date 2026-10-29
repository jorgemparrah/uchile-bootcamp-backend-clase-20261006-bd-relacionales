import { Module } from '@nestjs/common';
import { TipoEntradaService } from './tipo_entrada.service';
import { TipoEntradaController } from './tipo_entrada.controller';

@Module({
  controllers: [TipoEntradaController],
  providers: [TipoEntradaService],
})
export class TipoEntradaModule {}
