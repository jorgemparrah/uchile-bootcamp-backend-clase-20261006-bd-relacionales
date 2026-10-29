import { Actividad } from "../../actividad/entities/actividad.entity";
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm"

@Entity({ name: 'usuario' })
export class Usuario {

  @PrimaryColumn({ name: 'id', length: 64 })
  id: string;

  @Column({ name: 'nombre', length: 100 })
  nombre: string;

  @Column({ name: 'correo', length: 100, unique: true })
  correo: string;

  @Column({ name: 'clave', length: 100 })
  clave: string;

  @Column({ name: 'activo' })
  activo: boolean;

  @ManyToMany(() => Actividad, a => a.usuarios)
  @JoinTable({
    name: 'inscripcion',
    joinColumn: {
      name: 'usuario_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'actividad_id',
      referencedColumnName: 'id'
    }
  })
  actividades: Actividad[];
}
