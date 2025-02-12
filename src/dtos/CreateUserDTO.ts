import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({ message: "O email é obrigatório." })
  email: string;

  @IsOptional()
  data: Record<string, any>;
}
