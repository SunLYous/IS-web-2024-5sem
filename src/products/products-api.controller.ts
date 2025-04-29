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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';

@ApiTags('Products')
@Controller('api/products')
export class ProductsApiController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly s3Service: S3Service,
  ) {}

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
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Создать продукт с изображением' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Груша' },
        price: { type: 'number', example: 99.9 },
        categoryId: { type: 'number', example: 1 },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    let image: string | undefined;
    if (file) {
      image = await this.s3Service.uploadFile(file);
    }
    return this.productsService.create({ ...dto, image });
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
  @HttpCode(204)
  @ApiOperation({ summary: 'Удалить продукт' })
  @ApiResponse({ status: 204, description: 'Продукт удален' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.productsService.remove(id);
    if (!deleted) throw new NotFoundException('Product not found');
  }
}
