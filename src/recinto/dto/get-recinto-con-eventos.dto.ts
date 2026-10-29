import { ApiProperty } from "@nestjs/swagger";
import { GetEventoDto } from "src/evento/dto/get-evento.dto";

export class GetRecintoConEventosDto {

  @ApiProperty({ description: 'ID del recinto' })
  id: number;

  @ApiProperty({ description: 'Nombre del recinto' })
  nombre: string;

  @ApiProperty({ description: 'Dirección del recinto' })
  direccion: string;

  @ApiProperty({ description: 'Capacidad del recinto' })
  capacidad: number;

  @ApiProperty({ description: 'Lista de eventos del recinto' })
  eventos: GetEventoDto[];

}
