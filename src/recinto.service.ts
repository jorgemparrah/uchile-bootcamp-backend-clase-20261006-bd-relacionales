import { Injectable } from '@nestjs/common';
import { RecintoRepository } from './recinto.repository';

@Injectable()
export class RecintoService {

  constructor(private readonly recintoRepository: RecintoRepository) {}

  findAll(): any {
    return this.recintoRepository.findAll();
  }

  findById(id: string): any {
    return this.recintoRepository.findById(id);
  }
}
