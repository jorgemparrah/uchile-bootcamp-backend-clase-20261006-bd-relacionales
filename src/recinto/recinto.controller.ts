import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetRecintoDto } from './dto/get-recinto.dto';

@Controller('recinto')
export class RecintoController {
  constructor(private readonly recintoService: RecintoService) {}

  @ApiOperation({ summary: 'Crear un nuevo recinto' })
  @ApiBody({ type: CreateRecintoDto })
  @ApiResponse({ status: 201, description: 'Recinto creado', type: GetRecintoDto })
  @Post()
  create(@Body() createRecintoDto: CreateRecintoDto) : Promise<GetRecintoDto> {
    return this.recintoService.create(createRecintoDto);
  }

  @ApiOperation({ summary: 'Obtener todos los recintos' })
  @Get()
  findAll() : GetRecintoDto[] {
    return this.recintoService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un recinto por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  findOne(@Param('id') id: string) : GetRecintoDto {
    return this.recintoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar un recinto por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecintoDto: UpdateRecintoDto): GetRecintoDto {
    return this.recintoService.update(+id, updateRecintoDto);
  }

  @ApiOperation({ summary: 'Eliminar un recinto por ID' })
  @ApiParam({ name: 'id', type: 'number' }) 
  @Delete(':id')
  remove(@Param('id') id: string) : GetRecintoDto {
    return this.recintoService.remove(+id);
  }
}
