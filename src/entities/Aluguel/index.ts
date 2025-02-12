import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Cliente } from "../Cliente"; // Importando o modelo de Cliente
import { Obras } from "../Obras"; // Importando o modelo de Obras
import { BaseEntity } from "../BaseEntity";
import { AluguelProduto } from "../AluguelProduto";

@Entity("aluguel")
export class Aluguel extends BaseEntity {
  @Column("varchar", { length: 255 })
  nome: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.alugueis)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @ManyToOne(() => Obras, (obra) => obra.alugueis)
  @JoinColumn({ name: "obra_id" })
  obra: Obras;

  @Column("date")
  data_inicio: string;

  @Column("date")
  data_devolucao: string;

  @OneToMany(() => AluguelProduto, (aluguelProduto) => aluguelProduto.aluguel)
  produtos: AluguelProduto[];

  @Column("decimal", { precision: 10, scale: 2 })
  subtotal: number;

  @Column("text", { nullable: true, default: null })
  observacao: string | null;

  toString(): string {
    return this.nome;
  }
}
export { AluguelProduto };
