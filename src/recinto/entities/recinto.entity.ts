import { Evento } from "../../evento/entities/evento.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'recinto' })
export class Recinto {

  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'direccion' })
  direccion: string;

  @Column({ name: 'capacidad' })
  capacidad: number;

  @OneToMany(() => Evento,  (e) => e.recinto)
  eventos: Evento[];

}
