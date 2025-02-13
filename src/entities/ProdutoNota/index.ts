import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Produto } from "../Produto";
import { Nota } from "../Nota";

@Entity()
export class ProdutoNota extends BaseEntity {
  @ManyToOne(() => Produto)
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @Column("int")
  quantidade: number;

  @ManyToOne(() => Nota, (nota) => nota.produtos_nota)
  @JoinColumn({ name: "nota_id" })
  nota: Nota;
}
