import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}