import { Recinto } from "../../recinto/entities/recinto.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'evento' })
export class Evento {

  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre', length: 100 })
  nombre: string;

  @Column({ name: 'fecha', type: 'date' })
  fecha: Date;

  @Column({ name: 'capacidad' })
  capacidad: number;

  @Column({ name: 'activo' })
  activo: boolean;

  @Column({ name: 'recinto_id' })
  recintoId: number;

  @ManyToOne(() => Recinto)
  @JoinColumn({ name: 'recinto_id' })
  recinto: Recinto;

  /*
  @OneToMany()
  actividades: Actividad[];

  @OneToMany()
  entradas: Entrada[];
  */

}