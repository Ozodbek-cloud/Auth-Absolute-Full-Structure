import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class resetPasswordDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNumber()
    code: number

    @IsString()
    password: string
}