import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecintoNoExisteError } from 'src/errores/recinto-no-existe.error';
import { Recinto } from 'src/recinto/entities/recinto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecintoNoExistePipe implements PipeTransform {

  constructor(
    @InjectRepository(Recinto)
    private readonly recintoRepository: Repository<Recinto>
  ) {}

  async transform(id: any, metadata: ArgumentMetadata) : Promise<Recinto> {
    const recinto = await this.recintoRepository.findOne({ where: { id } });
    if (!recinto) {
      throw new RecintoNoExisteError(id);
    }
    return recinto;
  }
}
