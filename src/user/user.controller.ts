import { Body, Controller, Post, Get, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    const { password, ...result } =  user.toJSON();
    return result;
  }

  @Get('by-email')
  async getUser(@Query('email') email: string) {
    if (!email) {
      throw new NotFoundException('Email query parameter is required');
    }

    const user = await this.userService.getUser(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user.toJSON();
    return result;
  }
}

