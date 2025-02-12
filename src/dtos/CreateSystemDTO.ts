import { IsNotEmpty, IsOptional } from "class-validator";

export class SystemDTO {
  @IsNotEmpty({ message: "O nome do sistema é obrigatório." })
  name: string;

  @IsOptional()
  data: Record<string, any>;
}
