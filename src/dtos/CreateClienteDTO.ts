import { IsString, IsOptional, IsInt, Length } from "class-validator";

export class CreateClienteDTO {
  @IsString()
  name: string;

  @IsString()
  fantasy_name: string;

  @IsString()
  cnpj_cpf: string;

  @IsString()
  phone: string;

  @IsString()
  cellphone: string;

  @IsString()
  client_state: string;

  @IsString()
  address: string;

  @IsInt()
  address_number: number;

  @IsString()
  address_cep: string;

  @IsString()
  @Length(2, 2)
  address_uf: string;

  @IsString()
  address_city: string;

  @IsString()
  person_type: string;

  @IsString()
  address_neighborhood: string;

  @IsString()
  @IsOptional()
  address_complement?: string;

  @IsString()
  @IsOptional()
  contact?: string;
}
