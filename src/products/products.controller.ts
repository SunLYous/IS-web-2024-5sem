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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Render('products/index')
  async findAll() {
    const products = await this.productsService.findAll();
    return {
      layout: 'layouts/main',
      title: 'Все продукты',
      products,
    };
  }

  @Get('add')
  @Render('products/create')
  getAdd() {
    return {
      layout: 'layouts/main',
      title: 'Добавить продукт',
    };
  }

  @Post()
  @Redirect('/products')
  async create(@Body() dto: CreateProductDto) {
    await this.productsService.create({
      name: dto.name,
      price: Number(dto.price),
      categoryId: Number(dto.categoryId),
    });
  }

  @Get(':id')
  @Render('products/show')
  async show(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);

    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return {
      layout: 'layouts/main',
      title: product.name,
      product,
    };
  }

  @Get(':id/edit')
  @Render('products/edit')
  async edit(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);

    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return {
      layout: 'layouts/main',
      title: `Редактировать ${product.name}`,
      product,
    };
  }

  @Post(':id')
  @Redirect('/products')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    await this.productsService.update(+id, dto);
  }

  @Post(':id/delete')
  @Redirect('/products')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
  }

  @Sse('events')
  getEvents(): Observable<any> {
    return this.productsService.getEvents();
  }

  @Post('/api')
  async apiCreate(
    @Body() dto: Record<'name' | 'price' | 'categoryId', string>,
  ) {
    return this.productsService.create({
      name: dto.name,
      price: Number(dto.price),
      categoryId: Number(dto.categoryId),
    });
  }

  @Patch('/api/:id')
  async apiUpdate(
    @Param('id') id: string,
    @Body() dto: Record<'name' | 'price', string>,
  ) {
    return this.productsService.update(+id, {
      name: dto.name,
      price: Number(dto.price),
    });
  }

  @Delete('/api/:id')
  async apiDelete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
