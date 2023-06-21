import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetails } from 'src/interface/student.interface';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from 'src/schema/user.schema';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserRoleDto } from 'src/dto/update-userRole.dto';
import { JwtPayload } from 'src/auth/guards/JwtPayload';
import { Badge } from 'src/schema/badge.schema';
import { Article } from 'src/schema/article.schema';
import { Code } from 'src/schema/code.schema';
import { hash } from 'bcrypt';
import { Errors } from 'src/schema/error.schema';
import { Solution } from 'src/schema/solution.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Badge') private readonly badgeModel: Model<Badge>,
    @InjectModel('Error') private errorModel: Model<Errors>,
    @InjectModel('Article') private articleModel: Model<Article>,
    @InjectModel('Code') private codeModel: Model<Code>,
    @InjectModel('Solution') private solutionModel: Model<Solution>,
  ) {}
  async createUser(
    FirstName: String,
    LastName: String,
    PhoneNumber: String,
    email: String,
    hashedPassword: String,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      FirstName,
      LastName,
      PhoneNumber,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel
      .findById(id)
      .populate('badges')
      .populate('codes')
      .populate({
        path: 'errors',
        populate: {
          path: 'solutions',
          model: 'Solution',
          populate: {
            path: 'user',
            model: 'User',
          },
        },
      })
      .exec();

    if (!user) return null;

    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    return existingUser;
  }

  _getUserDetails(user: UserDocument): UserDetails {
    const userDetails: UserDetails = {
      id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      PhoneNumber: user.PhoneNumber,
      email: user.email,
      password: user.password,
      role: user.role,
      badges: user.badges,
      articles: user.articles,
      codes: user.codes,
      errors: [],
    };

    if (user.errors && user.errors.length > 0) {
      userDetails.errors = user.errors.map((error: Errors) => {
        return {
          ErrorName: error.ErrorName,
          ErrorDescription: error.ErrorDescription,
          solutions: error.solutions.map((solution) => solution._id),
        };
      });
    }

    return userDetails;
  }

  async getUsers(): Promise<UserDetails | any> {
    const userData = await this.userModel
      .find()
      .populate('badges')
      .populate('articles')
      .populate('codes')
      .exec();
    return userData;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const { password, ...rest } = updateUserDto;

    if (password) {
      const hashedPassword = await hash(password, 10);
      updateUserDto.password = hashedPassword;
    }
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found!`);
    }
    return existingUser;
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new NotFoundException('User #${userId} not found');
    }
    return deletedUser;
  }

  async changeUserRole(
    admin: JwtPayload,
    userId: string,
    userRoleDto: UserRoleDto,
  ): Promise<UserDocument> {
    const adminUser = await this.userModel.findById(admin.userId).exec();
    if (!adminUser) {
      throw new NotFoundException('Admin user not found');
    }

    if (adminUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admin users can change roles.');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = userRoleDto.role;
    return user.save();
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.userModel.find({ role: role }).exec();
  }

  async getUsersByBadge(badgeId: string): Promise<User[]> {
    const badge = await this.badgeModel.findById(badgeId).exec();
    if (!badge) {
      throw new Error('Badge not found');
    }

    const users = await this.userModel
      .find({ badges: badge._id })
      .populate('badges')
      .exec();
    return users;
  }

  async addErrorToUser(userId: string, errorData: any): Promise<Errors> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('Error not found');
    }

    const error = new this.errorModel({
      user: user.id,
      ErrorName: errorData.ErrorName,
      ErrorDescription: errorData.ErrorDescription,
    });

    user.errors.push(error._id);
    await user.save();
    await error.save();

    return error;
  }

  async addSolutionToUser(
    userId: string,
    solutionData: any,
  ): Promise<Solution> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('Error not found');
    }

    const solution = new this.solutionModel({
      user: user.id,
      guide: solutionData.guide,
      code: solutionData.code,
    });

    user.errors.push(solution._id);
    await user.save();
    await solution.save();

    return solution;
  }
  async getErrorsByUserId(userId: string): Promise<Errors[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const errors = await this.errorModel.find({ user: user._id }).exec();
    return errors;
  }

  async addArticleToUser(userId: string, articleData: any): Promise<Article> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const article = new this.articleModel({
      user: user.id,
      ArticleName: articleData.ArticleName,
      ArticleContent: articleData.ArticleContent,
    });

    user.articles.push(article._id);
    await user.save();
    await article.save();

    return article;
  }
  async addCodeToUser(userId: string, codeData: any): Promise<Code> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const code = new this.codeModel({
      user: user.id,
      title: codeData.title,
      content: codeData.content,
      classeDeLogs: codeData.classeDeLogs,
      config: codeData.config,
      recommendation: codeData.recommendation,
    });

    user.codes.push(code.id);
    await user.save();
    await code.save();
    return code;
  }

  async updateUserImage(
    userId: string,
    imageUrl: string,
  ): Promise<UserDocument> {
    try {
      // Retrieve the user from the database
      const user = await this.userModel.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Update the image field
      user.image = imageUrl;

      // Save the updated user
      const updatedUser = await user.save();

      return updatedUser;
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to update user image');
    }
  }

  async deleteErrorFromUser(userId: string, errorId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const errorIndex = user.errors.findIndex(
      (error) => error.toString() === errorId,
    );

    if (errorIndex === -1) {
      throw new Error('Error not found in user');
    }
    user.errors.splice(errorIndex);
    await user.save();
  }
}
