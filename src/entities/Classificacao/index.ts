import { Entity, Column } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity("classificacao")
export class Classificacao extends BaseEntity {
  @Column("varchar", { length: 100 })
  nome: string;

  @Column("text")
  descricao: string;

  toString(): string {
    return this.nome;
  }
}
