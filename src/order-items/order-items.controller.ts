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
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  @Render('order-items/index')
  async findAll() {
    const items = await this.orderItemsService.findAll();
    return {
      layout: 'layouts/main',
      title: 'Все элементы заказа',
      items,
    };
  }

  @Get('add')
  @Render('order-items/create')
  getAdd() {
    return {
      layout: 'layouts/main',
      title: 'Добавить элемент заказа',
    };
  }

  @Post()
  @Redirect('/order-items')
  async create(@Body() dto: CreateOrderItemDto) {
    await this.orderItemsService.create(dto);
  }

  @Get(':id')
  @Render('order-items/show')
  async show(@Param('id') id: string) {
    const item = await this.orderItemsService.findOne(+id);

    if (!item) {
      throw new NotFoundException('Элемент заказа не найден');
    }

    return {
      layout: 'layouts/main',
      title: `Элемент заказа #${item.id}`,
      item,
    };
  }

  @Get(':id/edit')
  @Render('order-items/edit')
  async edit(@Param('id') id: string) {
    const item = await this.orderItemsService.findOne(+id);

    if (!item) {
      throw new NotFoundException('Элемент заказа не найден');
    }

    return {
      layout: 'layouts/main',
      title: `Редактировать элемент заказа #${item.id}`,
      item,
    };
  }

  @Post(':id')
  @Redirect('/order-items')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderItemDto) {
    await this.orderItemsService.update(+id, dto);
  }

  @Post(':id/delete')
  @Redirect('/order-items')
  async remove(@Param('id') id: string) {
    await this.orderItemsService.remove(+id);
  }

  @Sse('events')
  getEvents(): Observable<any> {
    return this.orderItemsService.getEvents();
  }

  @Post('/api')
  async apiCreate(@Body() dto: CreateOrderItemDto) {
    return this.orderItemsService.create(dto);
  }

  @Patch('/api/:id')
  async apiUpdate(@Param('id') id: string, @Body() dto: UpdateOrderItemDto) {
    return this.orderItemsService.update(+id, dto);
  }

  @Delete('/api/:id')
  async apiDelete(@Param('id') id: string) {
    return this.orderItemsService.remove(+id);
  }
}
