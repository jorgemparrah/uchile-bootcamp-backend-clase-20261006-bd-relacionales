import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString } from "class-validator";

export class CreateEventoDto {

  @ApiProperty({ description: 'ID del evento', example: 500 })
  id: number;

  @ApiProperty({ description: 'Nombre del evento', example: 'Concierto' })
  nombre: string;

  @ApiProperty({ description: 'Fecha del evento', example: '2026-10-06' })
  @IsDateString({}, { message: 'El campo fecha debe ser una cadena de fecha válida' })
  fecha: string;

  @ApiProperty({ description: 'Capacidad del evento', example: 100 })
  capacidad: number;

  @ApiProperty({ description: 'Indica si el evento está activo', example: true })
  @IsBoolean({ message: 'El campo activo debe ser un valor booleano' })
  activo: boolean;

  @ApiProperty({ description: 'ID del recinto', example: 500 })
  recintoId: number;

  @ApiProperty({ description: 'Nombre del recinto', example: 'Estadio Nacional' })
  nombreRecinto: string;

  @ApiProperty({ description: 'Dirección del recinto', example: 'Av. Grecia 2001' })
  direccionRecinto: string;

  @ApiProperty({ description: 'Capacidad del recinto', example: 50000 })
  capacidadRecinto: number;

}
