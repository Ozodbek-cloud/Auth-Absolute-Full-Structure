import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './AuthDto/register.dto';
import { LoginDto } from './AuthDto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UserRole } from 'src/global/types/user.roles';
import { VerificationDto } from './AuthDto/verifiyDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
     
     @ApiOperation({
        summary: `${UserRole.USER}, ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}`, 
     })
    
    @Post('register')
    Register(@Body() payload: RegisterDto) {
        return this.authService.register(payload)
    }
    
    @ApiOperation({
        summary: `${UserRole.USER}, ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}`, 
     })
    
    @Post('login')
    Login(@Body() payload: LoginDto) {
        return this.authService.login(payload)
    }

    @Post('verify')
    Very(@Body() payload: VerificationDto) {
        return this.authService.verify(payload)
    }
    
}
