import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Produto } from "../Produto"; // Ensure that the path is correct and the file exists
import { BaseEntity } from "../BaseEntity";
import { Aluguel } from "../Aluguel";

@Entity("aluguel_produto")
export class AluguelProduto extends BaseEntity {
  @ManyToOne(() => Produto, (produto) => produto.alugueisProduto)
  @JoinColumn({ name: "produto_id" })
  produto: Produto;

  @ManyToOne(() => Aluguel, (aluguel) => aluguel.produtos)
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
