import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Produto } from "../Produto"; // Ensure that the path is correct and the file exists
import { BaseEntity } from "../BaseEntity";
import { Aluguel } from "../../entities/Aluguel";

@Entity("aluguel_produto")
export class AluguelProduto extends BaseEntity {
  @ManyToOne(() => Produto)
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @ManyToOne(() => Aluguel)
  @JoinColumn({ name: "aluguel_id" })
  aluguel: Aluguel;

  @Column("int")
  quantidade: number;

  @Column("decimal", { precision: 10, scale: 2 })
  preco_unitario: number;

  toString(): string {
    return `${this.produto.nome} (${this.quantidade} unidades)`;
  }
}
