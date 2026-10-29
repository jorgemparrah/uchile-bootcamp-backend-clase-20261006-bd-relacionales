import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: 'compra' })
export class Compra {

  @PrimaryColumn({ name: 'id' })
    id: number;

    @Column({ name: 'usuario_id', length: 64 })
    usuarioId: string;

    @Column({ name: 'evento_id' })
    eventoId: number;

    @Column({ name: 'tipo_entrada_id' })
    tipoEntradaId: number;

    @Column({ name: 'fecha', type: 'date' })
    fecha: Date;

}
