import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class AccessDto {
  @IsNotEmpty({ message: "O nível de acesso é obrigatório." })
  @IsString({ message: "O nível de acesso deve ser uma string." })
  accessLevel: string;
}

class SystemDto {
  @IsNotEmpty({ message: "O ID do sistema é obrigatório." })
  @IsString({ message: "O ID do sistema deve ser uma string." })
  id: string;

  @IsNotEmpty({ message: "O nome do sistema é obrigatório." })
  @IsString({ message: "O nome do sistema deve ser uma string." })
  name: string;

  @IsNotEmpty({ message: "A descrição do sistema é obrigatória." })
  @IsString({ message: "A descrição do sistema deve ser uma string." })
  description: string;
}

class UserDto {
  @IsNotEmpty({ message: "O e-mail do usuário é obrigatório." })
  @IsEmail({}, { message: "O e-mail do usuário é inválido." })
  email: string;

  @IsNotEmpty({ message: "A senha do usuário é obrigatória." })
  @IsString({ message: "A senha do usuário deve ser uma string." })
  @MinLength(6, {
    message: "A senha do usuário deve ter no mínimo 6 caracteres.",
  })
  password: string;

  @IsObject({ message: "Os dados do usuário devem ser um objeto." })
  data: Record<string, any>; // Permite qualquer estrutura para o campo data
}

export class CreateAccountDTO {
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @ValidateNested()
  @Type(() => AccessDto)
  access: AccessDto;

  @ValidateNested()
  @Type(() => SystemDto)
  system: SystemDto;
}
