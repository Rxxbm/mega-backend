import { Entity, Column } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity("Obras")
export class Obras extends BaseEntity {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "int" })
  address_number: number;

  @Column({ type: "varchar", length: 20 })
  address_cep: string;

  @Column({ type: "varchar", length: 2 })
  address_uf: string;

  @Column({ type: "varchar", length: 100 })
  address_city: string;

  @Column({ type: "varchar", length: 100 })
  address_neighborhood: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address_complement?: string;
}
