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
    @Matches(/^[a-aZ-Z0-9]{6, 20}$/)
    password: string
}