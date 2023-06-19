import { IsEmail, IsNotEmpty, IsStrongPassword, maxLength } from "class-validator";

export class DtoUser {

  @IsNotEmpty()
  name: string; 
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsStrongPassword()
  password: string

  @IsNotEmpty()
  contact: string
}

export class DtoUserLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  

  @IsNotEmpty()
  @IsStrongPassword()
  password: string
  
}


