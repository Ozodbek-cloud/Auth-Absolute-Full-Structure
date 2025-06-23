import { IsEmail, IsString } from "class-validator";


export class sendVerifyDto{
    @IsString()
    @IsEmail()
    email: string
}