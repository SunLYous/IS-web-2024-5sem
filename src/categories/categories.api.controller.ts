import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Категории')
@Controller('api/categories')
export class CategoriesApiController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список категорий' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы (по умолчанию: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество элементов на странице (по умолчанию: 10)',
  })
  @ApiResponse({ status: 200, description: 'Список категорий' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const [items, total] = await this.categoriesService.paginate(page, limit);
    const baseUrl = '/api/categories';
    return {
      data: items,
      meta: {
        total,
        page,
        limit,
      },
      links: {
        self: `${baseUrl}?page=${page}&limit=${limit}`,
        next: `${baseUrl}?page=${page + 1}&limit=${limit}`,
        prev: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить категорию по ID' })
  @ApiResponse({ status: 200, description: 'Категория найдена' })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    if (!category) throw new NotFoundException('Категория не найдена');
    return category;
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую категорию' })
  @ApiResponse({ status: 201, description: 'Категория успешно создана' })
  @ApiBadRequestResponse({ description: 'Некорректные данные' })
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить категорию по ID' })
  @ApiResponse({ status: 200, description: 'Категория успешно обновлена' })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить категорию по ID' })
  @ApiResponse({ status: 204, description: 'Категория удалена' })
  @ApiNotFoundResponse({ description: 'Категория не найдена' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoriesService.remove(id);
  }
}
