import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}