import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventoDto } from 'src/evento/dto/create-evento.dto';
import { Recinto } from 'src/recinto/entities/recinto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecintoExistePipe implements PipeTransform {

  constructor(
    @InjectRepository(Recinto)
    private readonly recintoRepository: Repository<Recinto>
  ) {}

  async transform(dto: CreateEventoDto, metadata: ArgumentMetadata) {
    console.log('Transforming DTO:', dto);
    const condicion = { where: { id: dto.recintoId } };
    console.log('Checking existence with condition:', condicion);
    const existe = await this.recintoRepository.findOne(condicion);
    console.log('Transforming DTO:', dto);
    if (existe) {
      if (dto.nombreRecinto || dto.direccionRecinto || dto.capacidadRecinto) {
        throw new ConflictException("El id del recinto existe, no se creará uno nuevo");
      }
    } else if (!dto.nombreRecinto || !dto.direccionRecinto || !dto.capacidadRecinto) {
      throw new ConflictException("Faltan los datos del recinto para crearlo");
    }
    return dto;
  }
}
