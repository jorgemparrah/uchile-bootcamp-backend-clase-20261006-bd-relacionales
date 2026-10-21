import { Column, Entity, PrimaryColumn } from "typeorm";

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

}
