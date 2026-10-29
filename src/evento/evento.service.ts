import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-evento.dto';
import { GetEventoConRecintoDto } from './dto/get-evento-con-recinto.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { Recinto } from 'src/recinto/entities/recinto.entity';

@Injectable()
export class EventoService {

  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,

    @InjectDataSource()
    private readonly dataSource: DataSource,

  ) {}

  async create(createEventoDto: CreateEventoDto) {
    try {
      
      // USO DE SQL DESDE TYPE ORM
      // await this.dataSource.manager.sql('SELECT 1');

      const resultado = await this.dataSource.transaction(async em => {
        
        if (createEventoDto.nombreRecinto && createEventoDto.direccionRecinto && createEventoDto.capacidadRecinto) {
          console.log('Creating recinto with data:', createEventoDto);
          const entidadRecinto = em.create(Recinto, {
            id: createEventoDto.recintoId,
            nombre: createEventoDto.nombreRecinto,
            direccion: createEventoDto.direccionRecinto,
            capacidad: createEventoDto.capacidadRecinto
          });
    
          console.log('Created recinto entity:', entidadRecinto);
          await em.save(Recinto, entidadRecinto);
          console.log('Saved recinto entity:', entidadRecinto);
        }
        
        console.log('Creating evento with data:', createEventoDto);
        const entidadEvento = em.create(Evento, {
          ...createEventoDto,
          fecha: new Date(createEventoDto.fecha)
        });
  
        console.log('Created evento entity:', entidadEvento);
        const entidadEventoGuardada = await em.save(Evento, entidadEvento);
        console.log('Saved evento entity:', entidadEventoGuardada);
  
        return entidadEventoGuardada;
      });
      return resultado;
    } catch (error) {
      console.error('Error creating evento:', error);
      throw error;
    }
  }

  async findAll() {
    const entities = await this.eventoRepository.find({
      relations: {
        recinto: true
      }
    });
    console.log(entities[0]);
    const lista = entities.map(entity => {
      const dto = new GetEventoConRecintoDto();
      dto.id = entity.id;
      dto.nombre = entity.nombre;
      dto.fecha = entity.fecha;
      dto.recintoDireccion = entity.recinto.direccion;
      return dto;
    });
    return lista;
  }

  async findActive() {
    const entities = await this.eventoRepository.createQueryBuilder('e')
      .leftJoinAndSelect('e.recinto', 'recinto')
      .where('e.activo = :param', { param: true })
      .getMany();

    const lista = entities.map(entity => {
      const dto = new GetEventoConRecintoDto();
      dto.id = entity.id;
      dto.nombre = entity.nombre;
      dto.fecha = entity.fecha;
      dto.recintoDireccion = entity.recinto.direccion;
      return dto;
    });
    return lista;
  }

  findOne(id: number) {
    return `This action returns a #${id} evento`;
  }

  update(id: number, updateEventoDto: UpdateEventoDto) {
    return `This action updates a #${id} evento`;
  }

  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
