import { PartialType } from '@nestjs/swagger';
import { CreateTipoEntradaDto } from './create-tipo_entrada.dto';

export class UpdateTipoEntradaDto extends PartialType(CreateTipoEntradaDto) {}
