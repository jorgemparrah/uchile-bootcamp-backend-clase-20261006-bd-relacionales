import { ApiProperty } from "@nestjs/swagger";

export class CreateInscripcionDto {

  @ApiProperty({ description: 'Array of user IDs to inscribe' })
  ids: string[];

}
