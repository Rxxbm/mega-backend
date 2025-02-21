import {
  IsString,
  IsOptional,
  IsEmail,
  Length,
  IsDateString,
  Matches,
} from "class-validator";

export class CreateFornecedorDTO {
  @IsString()
  @Length(1, 255)
  razao_social: string;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  nome_fantasia?: string;

  @IsString()
  @Length(11, 18)
  @Matches(/^\d{11}|\d{14}$/, { message: "CPF ou CNPJ inválido" })
  cpf_cnpj: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  endereco?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  bairro?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  uf?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  cidade?: string;

  @IsOptional()
  @IsString()
  @Length(8, 9)
  @Matches(/^\d{5}-?\d{3}$/, { message: "CEP inválido" })
  cep?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, { message: "Telefone inválido" })
  telefone?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
    message: "Telefone fax inválido",
  })
  telefone_fax?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
