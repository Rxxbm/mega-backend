import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Classificacao } from "../Classificacao"; // Importando o modelo de Classificação
import { Fornecedor } from "../Fornecedor"; // Importando o modelo de Fornecedor

@Entity("produto")
export class Produto extends BaseEntity {
  @Column("varchar", { length: 255 })
  nome: string;

  @ManyToOne(() => Classificacao)
  @JoinColumn({ name: "categoria_id" })
  categoria: Classificacao;

  @Column("decimal", { precision: 10, scale: 2 })
  preco: number;

  @Column("int")
  estoque: number;

  @Column("varchar", { length: 50, default: "PÇ" })
  unidade: string;

  @Column("decimal", { nullable: true, default: null })
  indenizacao: number | null;

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
