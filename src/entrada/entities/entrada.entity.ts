import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: 'entrada' })
export class Entrada {

  @PrimaryColumn({ name: 'evento_id' })
    eventoId: number;

  @PrimaryColumn({ name: 'tipo_entrada_id' })
    tipoEntradaId: number;

  @Column({ name: 'precio' })
    precio: number;

}
