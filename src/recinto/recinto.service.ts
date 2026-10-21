import { Injectable } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { Repository } from 'typeorm';
import { GetRecintoDto } from './dto/get-recinto.dto';

@Injectable()
export class RecintoService {

  constructor(
    @InjectRepository(Recinto)
    private readonly recintoRepository: Repository<Recinto>,
  ) {}

  async create(createRecintoDto: CreateRecintoDto) : Promise<GetRecintoDto> {
    const entidad : Recinto = this.recintoRepository.create({
      id: createRecintoDto.identificador,
      nombre: createRecintoDto.nombreRecinto,
      direccion: createRecintoDto.direccionRecinto,
      capacidad: createRecintoDto.capacidad
    });
    const entidadGuardada = await this.recintoRepository.save(entidad);
    const dto = new GetRecintoDto();
    dto.id = entidadGuardada.id;
    dto.nombre = entidadGuardada.nombre;
    dto.direccion = entidadGuardada.direccion;
    dto.capacidad = entidadGuardada.capacidad;
    return dto;
  }

  findAll() : GetRecintoDto[] {
    const dto = new GetRecintoDto();
    return [ dto ];
  }

  findOne(id: number) : GetRecintoDto {
    const dto = new GetRecintoDto();
    return dto;
  }

  update(id: number, updateRecintoDto: UpdateRecintoDto) : GetRecintoDto {
    const dto = new GetRecintoDto();
    return dto;
  }

  remove(id: number) : GetRecintoDto {
    const dto = new GetRecintoDto();
    return dto;
  }
}
