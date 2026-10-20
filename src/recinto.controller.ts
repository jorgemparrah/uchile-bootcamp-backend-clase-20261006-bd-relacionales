import { Controller, Get, Param } from '@nestjs/common';
import { RecintoService } from './recinto.service';

@Controller('recinto')
export class RecintoController {
  constructor(private readonly recintoService: RecintoService) {}

  @Get()
  findAll(): any {
    return this.recintoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): any {
    return this.recintoService.findById(id);
  }
}
