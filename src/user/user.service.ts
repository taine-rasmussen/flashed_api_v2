import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: Partial<User>): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const newUser = new this.userModel({
      ...data,
      email: data.email!.trim().toLowerCase(),
      password: hashedPassword,
    });

    return newUser.save();
  }

  async getUser(email: string): Promise<UserDocument | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return this.userModel.findOne({ email: normalizedEmail }).exec();
  }
}
