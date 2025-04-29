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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Render('categories/index')
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return {
      layout: 'layouts/main',
      title: 'Все категории',
      categories,
    };
  }

  @Get('add')
  @Render('categories/create')
  getAdd() {
    return {
      layout: 'layouts/main',
      title: 'Добавить категорию',
    };
  }

  @Post()
  @Redirect('/categories')
  async create(@Body() dto: CreateCategoryDto) {
    await this.categoriesService.create(dto);
  }

  @Get(':id')
  @Render('categories/show')
  async show(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return {
      layout: 'layouts/main',
      title: category.name,
      category,
    };
  }

  @Get(':id/edit')
  @Render('categories/edit')
  async edit(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(+id);

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return {
      layout: 'layouts/main',
      title: `Редактировать ${category.name}`,
      category,
    };
  }

  @Post(':id')
  @Redirect('/categories')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    await this.categoriesService.update(+id, dto);
  }

  @Post(':id/delete')
  @Redirect('/categories')
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(+id);
  }

  @Sse('events')
  getEvents(): Observable<any> {
    return this.categoriesService.getEvents();
  }

  @Post('/api')
  async apiCreate(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch('/api/:id')
  async apiUpdate(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, dto);
  }

  @Delete('/api/:id')
  async apiDelete(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
