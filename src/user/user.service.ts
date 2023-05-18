import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetails } from 'src/interface/student.interface';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schema/user.schema';
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
    };
  }
}
