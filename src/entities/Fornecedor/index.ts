import { Entity, Column } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity("fornecedor")
export class Fornecedor extends BaseEntity {
  @Column("varchar", { length: 255 })
  razao_social: string;

  @Column("date", { nullable: true, default: null })
  data: string | null;

  @Column("varchar", { length: 255, nullable: true, default: null })
  nome_fantasia: string | null;

  @Column("varchar", { length: 18, unique: true })
  cpf_cnpj: string;

  @Column("varchar", { length: 255, nullable: true, default: null })
  endereco: string | null;

  @Column("varchar", { length: 255, nullable: true, default: null })
  bairro: string | null;

  @Column("varchar", { length: 2, nullable: true, default: null })
  uf: string | null;

  @Column("varchar", { length: 255, nullable: true, default: null })
  cidade: string | null;

  @Column("varchar", { length: 9, nullable: true, default: null })
  cep: string | null;

  @Column("varchar", { length: 15, nullable: true, default: null })
  telefone: string | null;

  @Column("varchar", { length: 15, nullable: true, default: null })
  telefone_fax: string | null;

  @Column("varchar", { length: 255, nullable: true, default: null })
  email: string | null;

  @Column("text", { nullable: true, default: null })
  observacoes: string | null;

  toString(): string {
    return this.razao_social;
  }
}
