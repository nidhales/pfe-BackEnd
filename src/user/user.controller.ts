import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
  Request,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserDetails } from 'src/interface/student.interface';
import { UserService } from 'src/user/user.service';
import { UserRoleDto } from 'src/dto/update-userRole.dto';
import { JwtPayload } from 'src/auth/guards/JwtPayload';
import { JwtGaurd } from 'src/auth/guards/jwt.guard';
import { UserRole } from 'src/schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  @Get()
  async getUsers(@Res() response): Promise<UserDetails> {
    try {
      const userData = await this.userService.getUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id/role')
  @UseGuards(JwtGaurd)
  async changeUserRole(
    @Param('id') userId: string,
    @Body() userRoleDto: UserRoleDto,
    @Request() request: any,
  ) {
    const admin: JwtPayload = request.user;
    return this.userService.changeUserRole(admin, userId, userRoleDto);
  }

  @Get('role/:role')
  async getUserByRole(@Param('role') role: UserRole) {
    return this.userService.getUsersByRole(role);
  }
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
  @Get('badges/:badgeId')
  async getUsersByBadge(@Param('badgeId') badgeId: string) {
    return this.userService.getUsersByBadge(badgeId);
  }

  @Post(':userId/error')
  async addErrorToUser(@Param('userId') userId: string, @Body() userData: any) {
    try {
      const errors = await this.userService.addErrorToUser(userId, userData);
      return { message: 'Error added successfully', errors };
    } catch (error) {
      return { message: 'Error adding solution', error };
    }
  }
  @Post(':userId/solution')
  async addSolutionToUser(
    @Param('userId') userId: string,
    @Body() userData: any,
  ) {
    try {
      const solutions = await this.userService.addSolutionToUser(
        userId,
        userData,
      );
      return { message: 'Solution added successfully', solutions };
    } catch (error) {
      return { message: 'Error adding solution', error };
    }
  }
  @Post(':userId/article')
  async addArticleToUser(
    @Param('userId') userId: string,
    @Body() userData: any,
  ) {
    try {
      const articles = await this.userService.addArticleToUser(
        userId,
        userData,
      );
      return { message: 'Article added to User successfully', articles };
    } catch (error) {
      return { message: 'Error adding solution', error };
    }
  }

  @Post(':userId/code')
  async addCodeToUser(@Param('userId') userId: string, @Body() userData: any) {
    try {
      const codes = await this.userService.addCodeToUser(userId, userData);
      return { message: 'Code added to User successfully', codes };
    } catch (error) {
      return { message: 'Error adding solution', error };
    }
  }

  @Post(':id/image')
  async updateUserImage(
    @Param('id') userId: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    try {
      const updatedUser = await this.userService.updateUserImage(
        userId,
        imageUrl,
      );
      return updatedUser;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to update user image');
    }
  }
  @Get('user/:userId')
  async getErrorsByUserId(@Param('userId') userId: string) {
    const errors = await this.userService.getErrorsByUserId(userId);
    return errors;
  }
  @Delete(':userId/errors/:errorId')
  async deleteErrorFromUser(
    @Param('userId') userId: string,
    @Param('errorId') errorId: string,
  ) {
    try {
      await this.userService.deleteErrorFromUser(userId, errorId);
      return { message: 'Error deleted from user successfully' };
    } catch (error) {
      return { message: 'Error deleting error from user', error };
    }
  }
}
