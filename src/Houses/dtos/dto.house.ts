import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min, Max, MinLength, IsBoolean } from "class-validator";

export class DtoHouse {
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(230)
  apresentation:string


  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  description: string;

  @MinLength(3)
  @MaxLength(5)
  @IsNotEmpty()
  price: string; 

  @IsString()
  @IsNotEmpty()
  @IsIn(["🏡", "🏦"])
  type: string;

  @IsIn(["1", "2", "3", "4", "5"])
  @IsNotEmpty()
  bathrooms: string; 

  @IsNotEmpty()
  @IsIn(["1", "2", "3", "4", "5"])
  rooms: number
  
  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsIn(["Yes", "No"])
  @IsNotEmpty()
  pets: string 

  @IsNotEmpty()
  userId: string

}
