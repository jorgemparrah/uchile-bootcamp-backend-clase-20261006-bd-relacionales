import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { GetRecintoDto } from './dto/get-recinto.dto';
import { PaginacionDto } from './dto/paginacion.dto';
import { GetRecintoConEventosDto } from './dto/get-recinto-con-eventos.dto';
import { GetEventoDto } from 'src/evento/dto/get-evento.dto';
import { RecintoMapper } from './mapper/recinto.mapper';
import { Evento } from 'src/evento/entities/evento.entity';

@Injectable()
export class RecintoService {

  constructor(
    @InjectRepository(Recinto)
    private readonly recintoRepository: Repository<Recinto>,
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) { }

  async create(createRecintoDto: CreateRecintoDto): Promise<GetRecintoDto> {

    const entidadEncontrada: Recinto | null = await this.recintoRepository.findOneBy({
      id: createRecintoDto.identificador
    });
    if (entidadEncontrada) {
      throw new ConflictException(`Recinto con ID ${createRecintoDto.identificador} ya existe`);
    }

    const existeEntidad: boolean = await this.recintoRepository.existsBy({
      id: createRecintoDto.identificador
    });
    if (existeEntidad) {
      throw new ConflictException(`Recinto con ID ${createRecintoDto.identificador} ya existe`);
    }

    const cantidad: number = await this.recintoRepository.count({
      where: {
        id: createRecintoDto.identificador
      }
    });

    if (cantidad > 0) {
      throw new ConflictException(`Recinto con ID ${createRecintoDto.identificador} ya existe`);
    }

    const entidad: Recinto = RecintoMapper.toEntity(createRecintoDto);;

    /* IGUAL FUNCIONA
    const entidad2 : Recinto = new Recinto();
    entidad2.id = createRecintoDto.identificador;
    entidad2.nombre = createRecintoDto.nombreRecinto;
    entidad2.direccion = createRecintoDto.direccionRecinto;
    entidad2.capacidad = createRecintoDto.capacidad;
    */

    const entidadGuardada: Recinto = await this.recintoRepository.save(entidad);

    return RecintoMapper.toDtoResponse(entidadGuardada);
  }

  async findAll(nroPagina: number, registrosPorPagina: number, capacidad?: number, nombre?: string, capacidadMin?: number): Promise<PaginacionDto<GetRecintoDto>> {
    const filtros: any = {};
    if (capacidad) {
      filtros.capacidad = capacidad;
    } else if (capacidadMin) {
      filtros.capacidad = MoreThanOrEqual(capacidadMin)
    }
    if (nombre) {
      filtros.nombre = nombre;
    }

    let resultado: any = await this.recintoRepository.findAndCount({
      where: filtros,
      order: {
        nombre: 'DESC',
        capacidad: 'ASC'
      },
      skip: (nroPagina - 1) * registrosPorPagina,
      take: registrosPorPagina
    });

    const lista = resultado[0];
    const totalRegistros = resultado[1];

    const listaDto: GetRecintoDto[] = RecintoMapper.toDtoList(lista);
    
    const dto = new PaginacionDto<GetRecintoDto>();
    dto.nroPagina = nroPagina;
    dto.registrosPorPagina = registrosPorPagina;
    dto.totalRegistros = totalRegistros;
    dto.totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
    dto.lista = listaDto;
    return dto;
  }

  async findOne(entity: Recinto): Promise<GetRecintoConEventosDto> {
    const eventos = await this.eventoRepository.find({
      where: {
        recintoId: entity.id
      }
    });
    const dto : GetRecintoConEventosDto = RecintoMapper.toDtoConEventoResponse(entity, eventos);
    return dto;

  }

  async update(id: number, updateRecintoDto: UpdateRecintoDto): Promise<GetRecintoDto> {
    const entidad: Recinto | null = await this.recintoRepository.findOne({
      where: {
        id: id
      }
    });
    if (!entidad) {
      throw new NotFoundException(`Recinto con ID ${id} no encontrado`);
    }

    const entidadActualizada = RecintoMapper.toUpdateEntity(entidad, updateRecintoDto);
    const entidadGuardada = await this.recintoRepository.save(entidadActualizada);

    return { ...entidadGuardada } as GetRecintoDto;
  }

  async remove(entity: Recinto): Promise<GetRecintoDto> {
    const dto : GetRecintoDto = RecintoMapper.toDtoResponse(entity);
    const respuestaAccion = await this.recintoRepository.delete(entity.id);
    console.log(respuestaAccion);
    return dto;
  }

  async cantidadEventos() {
    const consulta = await this.recintoRepository.createQueryBuilder('r')
      .leftJoinAndSelect('r.eventos', 'e')
      .select('r.nombre', 'nombreRecinto')
      .addSelect('COUNT(e.id)', 'cantidadEventos')
      .groupBy('r.id')
      .addGroupBy('r.nombre')
      .getRawMany();
    return consulta;
  }
}
