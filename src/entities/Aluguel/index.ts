import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "../Cliente"; // Importando o modelo de Cliente
import { Obras } from "../Obras"; // Importando o modelo de Obras
import { BaseEntity } from "../BaseEntity";

@Entity("aluguel")
export class Aluguel extends BaseEntity {
  @Column("varchar", { length: 255 })
  nome: string;

  @Column()
  codigo: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @ManyToOne(() => Obras)
  @JoinColumn({ name: "obra_id" })
  obra: Obras;

  @Column("date")
  data_inicio: string;

  @Column("date")
  data_devolucao: string;

  @Column("decimal", { precision: 10, scale: 2 })
  subtotal: number;

  @Column("text", { nullable: true, default: null })
  observacao: string | null;

  toString(): string {
    return this.nome;
  }
}
