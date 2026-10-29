import { GetEventoDto } from "./dto/get-evento.dto";
import { Evento } from "./entities/evento.entity";

export class EventoMapper {

  static toDtoResponse(entity: Evento) : GetEventoDto {
    const dto = {
      id: entity.id,
      nombre: entity.nombre,
      fecha: entity.fecha,
      capacidad: entity.capacidad,
      activo: entity.activo
    } as GetEventoDto;
    return dto;
  }

  static toDtoResponseList(entities: Evento[]): GetEventoDto[] {
    if (!entities) {
      return [];
    }
    return entities.map(entity => EventoMapper.toDtoResponse(entity));
  }
}