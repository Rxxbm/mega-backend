import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Produto } from "../Produto";
@Entity("classificacao")
export class Classificacao extends BaseEntity {
  @Column("varchar", { length: 100 })
  nome: string;

  @Column("text")
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];

  toString(): string {
    return this.nome;
  }
}
