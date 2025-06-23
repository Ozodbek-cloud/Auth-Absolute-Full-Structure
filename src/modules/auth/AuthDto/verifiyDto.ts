import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerificationDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNumber()
    @IsNotEmpty()
    code: number

    @IsString()
    password: string
}