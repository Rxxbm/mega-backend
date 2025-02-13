import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Cliente } from "../Cliente";
import { Obras } from "../Obras";
import { ProdutoNota } from "../ProdutoNota";
import { BaseEntity } from "../BaseEntity";
import { Aluguel } from "../Aluguel";
import { Produto } from "../Produto";

@Entity()
export class Nota extends BaseEntity {
  @ManyToOne(() => Aluguel)
  @JoinColumn({ name: "aluguel_id" })
  aluguel: Aluguel;

  @Column("date")
  data_movimentacao: Date;

  @Column("text")
  tipo: string;

  @Column("text", { nullable: true })
  observacao: string;

  @ManyToMany(() => Produto, (produto) => produto.notas)
  @JoinTable()
  produtos_movimentados: Produto[];

  @OneToMany(() => ProdutoNota, (produtoNota) => produtoNota.nota)
  produtos_nota: ProdutoNota[];
}
