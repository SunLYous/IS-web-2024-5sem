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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';

@ApiExcludeController()
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly s3Service: S3Service,
  ) {}

  // SSR

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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    let image: string | undefined;

    if (file) {
      image = await this.s3Service.uploadFile(file);
    }

    await this.productsService.create({
      ...dto,
      price: Number(dto.price),
      categoryId: Number(dto.categoryId),
      image,
    });
  }

  @Get(':id')
  @Render('products/show')
  async show(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) throw new NotFoundException('Продукт не найден');
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
    if (!product) throw new NotFoundException('Продукт не найден');
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

  // API

  @Get('/api')
  async apiAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    const [products, total] = await this.productsService.paginate(
      parseInt(page),
      parseInt(limit),
    );
    return { data: products, total };
  }

  @Post('/api')
  @UseInterceptors(FileInterceptor('file'))
  async apiCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    let image: string | undefined;

    if (file) {
      image = await this.s3Service.uploadFile(file);
    }

    return this.productsService.create({
      ...dto,
      price: Number(dto.price),
      categoryId: Number(dto.categoryId),
      image,
    });
  }

  @Patch('/api/:id')
  async apiUpdate(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  @Delete('/api/:id')
  async apiDelete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
