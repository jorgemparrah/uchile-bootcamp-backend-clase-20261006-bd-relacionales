import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import { RecintoNoExiste409Filter } from 'src/filters/recinto-no-existe-409.filter';
import { RecintoExistePipe } from 'src/pipes/recinto-existe.pipe';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { EventoService } from './evento.service';

@Controller('evento')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @UseFilters(RecintoNoExiste409Filter)
  @Post()
  create(
    @Body(ValidationPipe, RecintoExistePipe) createEventoDto: CreateEventoDto
  ) {
    return this.eventoService.create(createEventoDto);
  }

  @Get()
  findAll() {
    return this.eventoService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.update(+id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoService.remove(+id);
  }
}
