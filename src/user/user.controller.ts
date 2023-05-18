import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UserDetails } from 'src/interface/student.interface';
import { UserService } from 'src/user/user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.getUserById(id);
  }
}
