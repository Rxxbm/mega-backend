import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Cliente } from "../Cliente";
import { Obras } from "../Obras";
import { ProdutoNota } from "../ProdutoNota";

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @ManyToOne(() => Obras)
  @JoinColumn({ name: "obra_id" })
  obra: Obras;

  @Column("date")
  data_movimentacao: Date;

  @Column("text", { nullable: true })
  observacao: string;

  @OneToMany(() => ProdutoNota, (produtoNota) => produtoNota.nota)
  produtosNota: ProdutoNota[];
}
