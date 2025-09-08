import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: Partial<User>): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const newUser = new this.userModel({
      ...data,
      password: hashedPassword,
    });

    return newUser.save();
  }
}
