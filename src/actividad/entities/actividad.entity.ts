import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'actividad' })
export class Actividad {

  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre', length: 100 })
  nombre: string;

  @Column({ name: 'evento_id' })
  eventoId: number;

  @ManyToMany(() => Usuario, (u) => u.actividades)
  usuarios: Usuario[];

}
