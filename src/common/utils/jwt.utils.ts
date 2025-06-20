import { JwtSignOptions } from "@nestjs/jwt";

export const JwtAccessToken: JwtSignOptions = {
   secret: 'O#z!o7',
   expiresIn: '1h'
} 

export const JWtRefreshToken: JwtSignOptions = {
    secret: 'HllW@o)',
    expiresIn: '1h'
}