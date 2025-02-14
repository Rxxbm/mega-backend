import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import { Aluguel } from "../Aluguel";

@Entity()
export class Nota extends BaseEntity {
  @ManyToOne(() => Aluguel)
  @JoinColumn({ name: "aluguel_id" })
  aluguel: Aluguel;

  @Column("date")
  data_movimentacao: Date;

  @Column("text")
  tipo: string;

  @Column("text", { nullable: true })
  observacao: string;
}
