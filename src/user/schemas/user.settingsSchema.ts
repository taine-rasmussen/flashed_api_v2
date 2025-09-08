import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Settings {
  @Prop({ default: true })
  notifications: boolean;

  @Prop({ default: false })
  darkMode: boolean;

  @Prop({ default: 'en' })
  language: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
