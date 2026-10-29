import { ApiProperty } from "@nestjs/swagger";

export class GetRecintoDto {

  @ApiProperty({ description: 'ID del recinto' })
  id: number;

  @ApiProperty({ description: 'Nombre del recinto' })
  nombre: string;

  @ApiProperty({ description: 'Dirección del recinto' })
  direccion: string;

  @ApiProperty({ description: 'Capacidad del recinto' })
  capacidad: number;

}
