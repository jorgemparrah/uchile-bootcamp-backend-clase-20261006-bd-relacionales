import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, UseFilters } from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetRecintoDto } from './dto/get-recinto.dto';
import { PaginacionDto } from './dto/paginacion.dto';
import { GetRecintoConEventosDto } from './dto/get-recinto-con-eventos.dto';
import { RecintoNoExistePipe } from 'src/pipes/recinto-no-existe.pipe';
import { Recinto } from './entities/recinto.entity';
import { RecintoNoExiste404Filter } from 'src/filters/recinto-no-existe-404.filter';

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

  @ApiOperation({ summary: 'Obtener la cantidad de eventos por recinto' })
  @Get('cantidad-eventos')
  cantidadEvento() {
    return this.recintoService.cantidadEventos();
  }

  @ApiOperation({ summary: 'Obtener todos los recintos' })
  @ApiResponse({ status: 200, description: 'Lista de recintos', type: PaginacionDto<GetRecintoDto> })
  @ApiQuery({ name: 'capacidad', required: false, type: 'number' })
  @ApiQuery({ name: 'nombre', required: false, type: 'string' })
  @ApiQuery({ name: 'capacidadMin', required: false, type: 'number' })
  @ApiQuery({ name: 'nroPagina', required: false, type: 'number' })
  @ApiQuery({ name: 'registrosPorPagina', required: false, type: 'number' })
  @Get()
  findAll(@Query('capacidad') capacidad?: number, @Query('nombre') nombre?: string, @Query('capacidadMin') capacidadMin?: number, @Query('nroPagina', new DefaultValuePipe(1)) nroPagina?: number, @Query('registrosPorPagina', new DefaultValuePipe(10)) registrosPorPagina?: number) : Promise<PaginacionDto<GetRecintoDto>> {
    return this.recintoService.findAll(nroPagina!, registrosPorPagina!, capacidad, nombre, capacidadMin);
  }

  @ApiOperation({ summary: 'Obtener un recinto por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @UseFilters(RecintoNoExiste404Filter)
  @Get(':id')
  async findOne(@Param('id', RecintoNoExistePipe) recintoEntity: Recinto) : Promise<GetRecintoConEventosDto> {
    return this.recintoService.findOne(recintoEntity);
  }

  @ApiOperation({ summary: 'Actualizar un recinto por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecintoDto: UpdateRecintoDto): Promise<GetRecintoDto> {
    return this.recintoService.update(+id, updateRecintoDto);
  }

  @ApiOperation({ summary: 'Eliminar un recinto por ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @UseFilters(RecintoNoExiste404Filter)
  @Delete(':id')
  remove(@Param('id', RecintoNoExistePipe) recintoEntity: Recinto) : Promise<GetRecintoDto> {
    return this.recintoService.remove(recintoEntity);
  }
}
