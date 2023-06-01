import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserDetails } from 'src/interface/student.interface';
import { ExistingUserDTO } from 'src/user/existing-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtservice: JwtService,
  ) {}

  async hashPassword(password: string): Promise<String> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<CreateUserDto>): Promise<UserDetails | any> {
    const { name, email, password } = user;
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) return 'Email taken!';
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );
    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | any> {
    const user = await this.userService.getUserByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return 'null';

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return 'null';

    return this.userService._getUserDetails(user);
  }

  // async login(
  //   existingUser: ExistingUserDTO,
  // ): Promise<{ token: string } | null> {
  //   const { email, password } = existingUser;
  //   const user = await this.validateUser(email, password);
  //   if (!user)
  //   const jwt = await this.jwtservice.signAsync({ user });
  //   if (existingUser) return { token: jwt };
  // }

  async login(existingUser: ExistingUserDTO): Promise<{ token: string }> {
    const { email, password } = existingUser;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const jwt = await this.jwtservice.signAsync({ user });

    return { token: jwt } ;
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtservice.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
