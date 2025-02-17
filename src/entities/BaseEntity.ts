import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// Verifica se o banco de dados usado é SQLite
const isSQLite = process.env.NODE_ENV === "test";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: isSQLite ? "datetime" : "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: isSQLite ? "datetime" : "timestamp" })
  updated_at: Date;
}
