import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class refreshTokenDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsJWT()
    token: string
}