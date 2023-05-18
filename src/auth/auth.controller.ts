import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDetails } from 'src/interface/student.interface';
import { AuthService } from './auth.service';
import { ExistingUserDTO } from 'src/user/existing-user.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}
    
    @Post('register')
        register(@Body() user: CreateUserDto): Promise<UserDetails| null> {
            return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDTO): Promise<{token:string}| null> {
        return this.authService.login(user);
}
}