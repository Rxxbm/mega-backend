import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Classificacao } from "../Classificacao"; // Importando o modelo de Classificação
import { Fornecedor } from "../Fornecedor"; // Importando o modelo de Fornecedor
import { AluguelProduto } from "../Aluguel";

@Entity("produto")
export class Produto extends BaseEntity {
  @Column("varchar", { length: 255 })
  nome: string;

  @ManyToOne(() => Classificacao, (classificacao) => classificacao.produtos)
  @JoinColumn({ name: "categoria_id" })
  categoria: Classificacao;

  @Column("decimal", { precision: 10, scale: 2 })
  preco: number;

  @Column("int")
  estoque: number;

  @Column("varchar", { length: 50, default: "PÇ" })
  unidade: string;

  @Column("decimal", { nullable: true, default: null })
  idenizacao: number | null;

  @OneToMany(() => AluguelProduto, (aluguelProduto) => aluguelProduto.produto)
  alugueisProduto: AluguelProduto[];

  @ManyToOne(
    () => Fornecedor,
    (fornecedor: { produtos: any }) => fornecedor.produtos
  )
  @JoinColumn({ name: "fornecedor_id" })
  fornecedor: Fornecedor;

  toString(): string {
    return this.nome;
  }
}
