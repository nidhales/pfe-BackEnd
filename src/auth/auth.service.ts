import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDetails } from 'src/interface/student.interface';
import { ExistingUserDTO } from 'src/user/existing-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtservice: JwtService) {}

    async hashPassword( password: string): Promise<String> {
        return bcrypt.hash(password, 12)
    }

    async register(user: Readonly<CreateUserDto>): Promise<UserDetails | any>{
        const {name,email,password} = user;
        const existingUser = await this.userService.getUserByEmail(email);
        if(existingUser) return 'Email taken!';
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.createUser(name,email,hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(password: String, hashedPassword: String):Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<UserDetails | any>{
        const user = await this.userService.getUserByEmail(email);
        const doesUserExist = !!user;

        if(!doesUserExist) return 'null';

        const doesPasswordMatch = await this.doesPasswordMatch(password,user.password);

        if(!doesPasswordMatch) return 'null';

        return this.userService._getUserDetails(user);
    } 

    async login(existingUser: ExistingUserDTO): Promise<{token: string}| null> {
        const { email, password } = existingUser;
        const user = await this.validateUser(email,password);
        if(!user) return null;

        const jwt = await this.jwtservice.signAsync({ user });
        if(existingUser) return { token: jwt };
    }
    
}
