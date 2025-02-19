import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDTO {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;
}
