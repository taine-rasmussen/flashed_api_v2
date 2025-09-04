import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, sparse: true })
  username?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  homeGym?: string;

  @Prop({ required: true })
  gradeStyle: string;

  @Prop()
  profileImageUrl?: string;

  @Prop({ default: 'email', enum: ['email', 'google', 'apple', 'facebook'] })
  authProvider: string;

  @Prop({ default: true })
  notificationsEnabled: boolean;

  @Prop({ default: ['user'] })
  roles: string[];

  @Prop({ default: 'active', enum: ['active', 'suspended', 'deleted'] })
  status: string;

  @Prop([String])
  deviceTokens?: string[];

  @Prop({
    default: {
      notifications: true,
      darkMode: false,
      language: 'en',
    },
  })
  settings?: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
