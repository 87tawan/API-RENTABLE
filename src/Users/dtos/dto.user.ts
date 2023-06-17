import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, isNotEmpty, isNumber } from 'class-validator';

export class DtoUser {

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @MinLength(5)
  @MaxLength(50)
  @IsNotEmpty()
  contact: string
}

export class DtoUserLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}


export class DtoEditContact {
  @IsNotEmpty()
  contact: string 
}