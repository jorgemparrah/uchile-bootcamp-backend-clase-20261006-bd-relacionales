import { EventoMapper } from "src/evento/evento.mapper";
import { GetRecintoConEventosDto } from "../dto/get-recinto-con-eventos.dto";
import { GetRecintoDto } from "../dto/get-recinto.dto";
import { Recinto } from "../entities/recinto.entity";
import { CreateRecintoDto } from "../dto/create-recinto.dto";
import { UpdateRecintoDto } from "../dto/update-recinto.dto";
import { Evento } from "src/evento/entities/evento.entity";

export class RecintoMapper {

  static toDtoResponse(entity: Recinto) : GetRecintoDto {
    const dto = new GetRecintoDto();
    dto.id = entity.id;
    dto.nombre = entity.nombre;
    dto.direccion = entity.direccion;
    dto.capacidad = entity.capacidad;
    return dto;
  }

  static toDtoResponse2(entity: Recinto) : GetRecintoDto {
    const dto = {
      id: entity.id,
      nombre: entity.nombre,
      direccion: entity.direccion,
      capacidad: entity.capacidad,
    } as GetRecintoDto;
    return dto;
  }

  static toDtoResponse3(entity: Recinto) : GetRecintoDto {
    const dto = {
      ...entity,
      // nombreRecinto: entity.nombre
    } as GetRecintoDto;
    return dto;
  }

  static toDtoList(entities: Recinto[]): GetRecintoDto[] {
    if (!entities) {
      return [];
    }
    return entities.map(entity => RecintoMapper.toDtoResponse(entity));
  }

  static toDtoConEventoResponse(entity: Recinto, eventos: Evento[]) : GetRecintoConEventosDto {
    const dto : GetRecintoConEventosDto = {
      ...RecintoMapper.toDtoResponse(entity),
      eventos: EventoMapper.toDtoResponseList(eventos)
    } as GetRecintoConEventosDto;
    return dto;
  }

  static toEntity(dto: CreateRecintoDto): Recinto {
    const entity = new Recinto();
    entity.id = dto.identificador;
    entity.nombre = dto.nombreRecinto;
    entity.direccion = dto.direccionRecinto;
    entity.capacidad = dto.capacidad;
    return entity;
  }

  static toUpdateEntity(entity: Recinto, dto: UpdateRecintoDto): Recinto {
    entity.nombre = dto.nombreRecinto;
    entity.direccion = dto.direccionRecinto;
    entity.capacidad = dto.capacidad;
    return entity;
  }


}