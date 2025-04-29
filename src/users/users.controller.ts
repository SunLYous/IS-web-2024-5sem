import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Redirect,
  Sse,
  Render,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('users/index')
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      layout: 'layouts/main',
      title: 'Все пользователи',
      users,
    };
  }

  @Get('add')
  @Render('users/create')
  getAdd() {
    return {
      layout: 'layouts/main',
      title: 'Добавить пользователя',
    };
  }

  @Post()
  @Redirect('/users')
  async create(@Body() dto: CreateUserDto) {
    await this.usersService.create(dto);
  }

  @Get(':id')
  @Render('users/show')
  async show(@Param('id') id: string) {
    console.log('SHOW USER id =', id);
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return {
      layout: 'layouts/main',
      title: `Пользователь ${user.name}`,
      user,
    };
  }

  @Get(':id/edit')
  @Render('users/edit')
  async edit(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return {
      layout: 'layouts/main',
      title: `Редактировать ${user.name}`,
      user,
    };
  }

  @Post(':id')
  @Redirect('/users')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    await this.usersService.update(+id, dto);
  }

  @Post(':id/delete')
  @Redirect('/users')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }

  @Sse('events')
  getEvents(): Observable<any> {
    console.log('📡 SSE соединение установлено');
    return this.usersService.getEvents();
  }

  @Post('/api')
  async apiCreate(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch('/api/:id')
  async apiUpdate(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete('/api/:id')
  async apiDelete(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
