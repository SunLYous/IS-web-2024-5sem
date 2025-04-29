// src/orders/orders.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Заказы')
@Controller('api/orders')
export class OrdersApiController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список заказов с пагинацией' })
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
  @ApiResponse({ status: 200, description: 'Список заказов' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const [items, total] = await this.ordersService.paginate(page, limit);
    const baseUrl = '/api/orders';
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
  @ApiOperation({ summary: 'Получить заказ по ID' })
  @ApiResponse({ status: 200, description: 'Заказ найден' })
  @ApiNotFoundResponse({ description: 'Заказ не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.ordersService.findOne(id);
    if (!order) throw new NotFoundException('Заказ не найден');
    return order;
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый заказ' })
  @ApiResponse({ status: 201, description: 'Заказ успешно создан' })
  @ApiBadRequestResponse({ description: 'Некорректные данные' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить заказ по ID' })
  @ApiResponse({ status: 200, description: 'Заказ успешно обновлен' })
  @ApiNotFoundResponse({ description: 'Заказ не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить заказ по ID' })
  @ApiResponse({ status: 204, description: 'Заказ удален' })
  @ApiNotFoundResponse({ description: 'Заказ не найден' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.ordersService.remove(id);
  }
}
