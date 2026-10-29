import { Injectable } from '@nestjs/common';
import { CreateTipoEntradaDto } from './dto/create-tipo_entrada.dto';
import { UpdateTipoEntradaDto } from './dto/update-tipo_entrada.dto';

@Injectable()
export class TipoEntradaService {
  create(createTipoEntradaDto: CreateTipoEntradaDto) {
    return 'This action adds a new tipoEntrada';
  }

  findAll() {
    return `This action returns all tipoEntrada`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoEntrada`;
  }

  update(id: number, updateTipoEntradaDto: UpdateTipoEntradaDto) {
    return `This action updates a #${id} tipoEntrada`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoEntrada`;
  }
}
