import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
} from "class-validator";

export class CreateObrasDTO {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsInt()
  address_number: number;

  @IsString()
  @Length(8, 20)
  address_cep: string;

  @IsString()
  @Length(2, 2)
  address_uf: string;

  @IsString()
  @MaxLength(100)
  address_city: string;

  @IsString()
  @MaxLength(100)
  address_neighborhood: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address_complement?: string;
}
