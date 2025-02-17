import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Generated,
} from "typeorm";

// Verifica se o banco de dados usado é SQLite
const isSQLite = process.env.NODE_ENV === "test";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("increment")
  codigo: number;

  @CreateDateColumn({ type: isSQLite ? "datetime" : "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: isSQLite ? "datetime" : "timestamp" })
  updated_at: Date;
}
