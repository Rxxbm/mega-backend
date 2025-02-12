import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Produto } from "../Produto";
import { Nota } from "../Nota";

@Entity()
export class ProdutoNota {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @Column("int")
  quantidade: number;

  @ManyToOne(() => Nota, (nota) => nota.produtosNota)
  @JoinColumn({ name: "nota_id" })
  nota: Nota;
}
