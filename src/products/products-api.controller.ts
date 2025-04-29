import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiResponse, ApiQuery, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('api/products')
export class ProductsApiController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список продуктов' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    const [data, total] = await this.productsService.paginate(page, limit);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        prev: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        next:
          total > page * limit
            ? `/api/products?page=${page + 1}&limit=${limit}`
            : null,
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiResponse({ status: 200, description: 'Продукт найден' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Создать продукт' })
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Обновить продукт' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, dto);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт' })
  @ApiResponse({ status: 204, description: 'Продукт удален' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.productsService.remove(id);
    if (!deleted) throw new NotFoundException('Product not found');
    return { message: 'Product deleted' };
  }
}
