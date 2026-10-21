import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, MaxLength } from "class-validator";

export class CreateRecintoDto {

  @ApiProperty({ description: 'ID del recinto', example: 15 })
  @IsInt()
  @IsPositive()
  identificador: number;

  @ApiProperty({ description: 'Nombre del recinto', example: 'Estadio Nacional' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  nombreRecinto: string;

  @ApiProperty({ description: 'Dirección del recinto', example: 'Av. Grecia 2001, Santiago' })
  @MaxLength(300, { message: 'La dirección no puede tener más de 300 caracteres' })
  direccionRecinto: string;

  @ApiProperty({ description: 'Capacidad del recinto', example: 50000 })
  @IsInt()
  @IsPositive()
  capacidad: number;
}
