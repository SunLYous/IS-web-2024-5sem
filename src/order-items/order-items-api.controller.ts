import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Элементы заказа')
@Controller('api/order-items')
export class OrderItemsApiController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список элементов заказа' })
  @ApiResponse({ status: 200, description: 'Список элементов заказа' })
  async findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить элемент заказа по ID' })
  @ApiResponse({ status: 200, description: 'Элемент заказа найден' })
  @ApiNotFoundResponse({ description: 'Элемент заказа не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const orderItem = await this.orderItemsService.findOne(id);
    if (!orderItem) throw new NotFoundException('Элемент заказа не найден');
    return orderItem;
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый элемент заказа' })
  @ApiResponse({ status: 201, description: 'Элемент заказа успешно создан' })
  @ApiBadRequestResponse({ description: 'Некорректные данные' })
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить элемент заказа по ID' })
  @ApiResponse({ status: 200, description: 'Элемент заказа успешно обновлен' })
  @ApiNotFoundResponse({ description: 'Элемент заказа не найден' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить элемент заказа по ID' })
  @ApiResponse({ status: 204, description: 'Элемент заказа удален' })
  @ApiNotFoundResponse({ description: 'Элемент заказа не найден' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.orderItemsService.remove(id);
  }
}
