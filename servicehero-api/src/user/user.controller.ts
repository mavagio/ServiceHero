import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserPayload } from './types';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<UserPayload[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<UserPayload> {
    return this.userService.fineOneById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const user = await this.userService.create(createUserDto);
      return res.send(user);
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
