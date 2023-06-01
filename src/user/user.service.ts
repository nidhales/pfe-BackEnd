import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetails } from 'src/interface/student.interface';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
import { UpdateUserDto } from 'src/dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    name: String,
    email: String,
    hashedPassword: String,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async getUserById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    return existingUser;
  }
  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async getUsers(): Promise<UserDetails | any> {
    const userData = await this.userModel.find().exec();
    return userData;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const existingError = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingError) {
      throw new NotFoundException('User #${userId} not found !');
    }
    return existingError;
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new NotFoundException('User #${userId} not found');
    }
    return deletedUser;
  }

  async updateProfileImage(
    userId: string,
    profileImage: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { profileImage }, { new: true })
      .exec();
  }
}
