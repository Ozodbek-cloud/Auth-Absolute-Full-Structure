import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from 'src/common/mail/mail.service';
import { Users } from 'src/common/models/user.models';
import { RegisterDto } from './AuthDto/register.dto';
import  *  as bcrypt  from "bcrypt"
@Injectable()
export class AuthService {
    constructor(@InjectModel(Users) private userModel: typeof Users, 
    private jwtService: JwtService,
    private mailerService: MailService,
    ) 
    {}
    
    private async generateToken(payload: object) {
        return {
            accessToken: await this.jwtService.signAsync(payload),
            refreshToken: await this.jwtService.signAsync(payload)
        }
    }

    async register(payload: Required<RegisterDto>) {
        let username = await this.userModel.findOne({where: {username: payload.username}})
        if (username) throw new ConflictException(`${payload.username} is already registered!`)
        let email = await this.userModel.findOne({where: {email: payload.email}})
        if (email) throw new ConflictException(`${payload.email} is already exists!`)
        
        let code = Math.floor((Math.random() * 100000) + 100000)

        await this.mailerService.verification(payload.email, 'Verification', code)
        let hash = await bcrypt.hash(payload.password, 10)
        let data = await this.userModel.create({...payload, password: hash})
        
        let token = await this.generateToken({userId: data.dataValues.id, role: data.dataValues.role})

       return { token, data }

    }
}
