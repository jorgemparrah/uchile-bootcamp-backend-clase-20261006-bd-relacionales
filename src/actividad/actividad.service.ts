import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { In, Repository } from 'typeorm';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { Actividad } from './entities/actividad.entity';
@Injectable()
export class ActividadService {

  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createActividadDto: CreateActividadDto) {
    return 'This action adds a new actividad';
  }

  findAll() {
    return this.actividadRepository.find({
      relations: {
        usuarios: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} actividad`;
  }

  async inscribir(id: number, incripcionDto: CreateInscripcionDto) {
    const actividad = await this.actividadRepository.findOne({
      where: { id },
      relations: { usuarios: true }
    });

    if (!actividad) {
      throw new ConflictException(`Actividad with id ${id} not found`);
    }

    if (actividad.usuarios.some(usuario => incripcionDto.ids.includes(usuario.id))) {
      throw new ConflictException(`Some users are already inscribed in this actividad`);
    }

    const usuarios = await this.usuarioRepository.find({
      where: {
        id: In(incripcionDto.ids)
      }
    });

    if (usuarios.length !== incripcionDto.ids.length) {
      throw new ConflictException(`Some users not found`);
    }

    actividad.usuarios = [...actividad.usuarios, ...usuarios];
    const actividadGuardada = await this.actividadRepository.save(actividad);
    return actividadGuardada;
  }

  remove(id: number) {
    return `This action removes a #${id} actividad`;
  }
}
