import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from 'src/common/mail/mail.service';
import { Users } from 'src/common/models/user.models';
import { RegisterDto } from './AuthDto/register.dto';
import  *  as bcrypt  from "bcrypt"
import { LoginDto } from './AuthDto/login.dto';
import { JwtAccessToken, JWtRefreshToken } from 'src/common/utils/jwt.utils';
import { RedisService } from 'src/common/redis/redis.service';
import { VerificationDto } from './AuthDto/verifiyDto';
import { resetPasswordDto } from './AuthDto/ResetPasswordDto';
import { sendVerifyDto } from './AuthDto/sendVerifyDto';

interface JwtPayload{
        id: number,
        role: string
    }

@Injectable()
export class AuthService {
    constructor(@InjectModel(Users) private userModel: typeof Users, 
    private jwtService: JwtService,
    private mailerService: MailService,
    private redisService: RedisService
    ) 
    {}
    
    
    private async generateToken(payload: JwtPayload, accessTokenOnly = false) {
    const accessToken = await this.jwtService.signAsync(payload, JwtAccessToken);
    if (accessTokenOnly) {
      return { accessToken };
    }

    const refreshToken = await this.jwtService.signAsync(
      { id: payload.id },
      JWtRefreshToken
    );

    return { accessToken, refreshToken };
  }


    async register(payload: Required<RegisterDto>) {
        let username = await this.userModel.findOne({where: {username: payload.username}})
        if (username) throw new ConflictException(`${payload.username} is already registered!`)
        let email = await this.userModel.findOne({where: {email: payload.email}})
        if (email) throw new ConflictException(`${payload.email} is already exists!`)
        
        let code = Math.floor((Math.random() * 100000))
        await this.mailerService.verification(payload.email, 'Verification', code)
                 
        await this.redisService.set(`register:${payload.email}`, JSON.stringify({...payload, code}), 600)
        
        return {
          message: `Verification Successfully send to ${payload.email}`
        }
    }


    async verify(payload:VerificationDto) {
        let stored = await this.redisService.get(`register:${payload.email}`)
        if(!stored) throw new BadRequestException("Otp expire or not Found")

        let userData = JSON.parse(stored)
        if(userData.code != payload.code) throw new BadRequestException("Otp invalide")

        await this.redisService.del(`register: ${payload.email}`)
        delete userData.code

        let hash = await bcrypt.hash(userData.password, 10)
        let user = await this.userModel.create({...userData, password:hash})

        return this.generateToken({id: user.dataValues.id, role: user.dataValues.role})
    }

    
    async login(payload: Required<LoginDto>) {
       let exists = await this.userModel.findOne({where: {email: payload.email}})
       if (!exists) throw new BadRequestException(`this ${payload.email} does not exists`)

       let compare = await bcrypt.compare(payload.password, exists.dataValues.password)
       if(!compare) throw new BadRequestException(`this ${payload.password} incorrect password`)

        let token = await this.generateToken({id: exists.dataValues.id, role: exists.dataValues.role})

        return { token, exists,}
    }

    async sendVerify(payload: sendVerifyDto) {
      let code = Math.floor(Math.random() * 10000)

      await this.mailerService.verification(payload.email, 'Veritification code', code)

      await this.redisService.set(`pass:${payload.email}`,JSON.stringify({...payload, code}), 600)

      return {
        message: `Verification code send to ${payload.email}`
      }
    }

    async reset_password(payload: resetPasswordDto) {
      let stored = await this.redisService.get(`pass:${payload.email}`)
      if (!stored) throw new BadRequestException("Otp expire or not found")
      
      let userData = JSON.parse(stored)

      if(userData.code != payload.code) throw new BadRequestException("Otp invalid")
      
     await this.redisService.del(`pass:${payload.email}`)

     let hash = await bcrypt.hash(payload.password, 10)

     await this.userModel.update({password: hash}, {
      where: {email: payload.email}
    })

    return {
      message: "Password Updated SuccessFully"
    }
    }
}
