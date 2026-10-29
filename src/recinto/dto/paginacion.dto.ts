import { ApiProperty } from "@nestjs/swagger";

export class PaginacionDto<TEMPLATE_DTO> {

  @ApiProperty({ description: 'Número de página actual' })
  nroPagina: number;

  @ApiProperty({ description: 'Cantidad de registros por página' })
  registrosPorPagina: number;

  @ApiProperty({ description: 'Total de registros' })
  totalRegistros: number;

  @ApiProperty({ description: 'Total de páginas' })
  totalPaginas: number;

  @ApiProperty({ description: 'Lista de elementos de la página' })
  lista: TEMPLATE_DTO[];
}