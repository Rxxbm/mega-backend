import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Aluguel } from "../Aluguel";

@Entity("cliente")
export class Cliente extends BaseEntity {
  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255, nullable: true, default: null })
  fantasy_name: string | null;

  @Column("varchar", { length: 18, unique: true })
  cnpj_cpf: string;

  @Column("varchar", { length: 15, nullable: true, default: null })
  phone: string | null;

  @Column("varchar", { length: 15 })
  cellphone: string;

  @Column("varchar", { length: 50 })
  client_state: string;

  @Column("varchar", { length: 255 })
  address: string;

  @Column("int")
  address_number: number;

  @Column("varchar", { length: 9 })
  address_cep: string;

  @Column("varchar", { length: 2 })
  address_uf: string;

  @Column("varchar", { length: 100 })
  address_city: string;

  @Column("varchar", { length: 50 })
  person_type: string;

  @Column("varchar", { length: 100 })
  address_neighborhood: string;

  @Column("varchar", { length: 100, nullable: true, default: null })
  address_complement: string | null;

  @Column("varchar", { length: 255, nullable: true, default: null })
  contact: string | null;

  @OneToMany(() => Aluguel, (aluguel) => aluguel.cliente)
  alugueis: Aluguel[];

  toString(): string {
    return this.name;
  }
}
