import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: 'tipo_entrada' })
export class TipoEntrada {

  @PrimaryColumn({ name: 'id' })
    id: number;

  @Column({ name: 'nombre', length: 64 })
    nombre: string;

}
