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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Observable } from 'rxjs';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Render('orders/index')
  async findAll() {
    const orders = await this.ordersService.findAll();
    return {
      layout: 'layouts/main',
      title: 'Все заказы',
      orders,
    };
  }

  @Get('add')
  @Render('orders/create')
  getAdd() {
    return {
      layout: 'layouts/main',
      title: 'Создать новый заказ',
    };
  }

  @Post()
  @Redirect('/orders')
  async create(@Body() dto: CreateOrderDto) {
    await this.ordersService.create(dto);
  }

  @Get(':id')
  @Render('orders/show')
  async show(@Param('id') id: string) {
    const order = await this.ordersService.findOne(+id);

    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    return {
      layout: 'layouts/main',
      title: `Заказ #${order.id}`,
      order,
    };
  }

  @Get(':id/edit')
  @Render('orders/edit')
  async edit(@Param('id') id: string) {
    const order = await this.ordersService.findOne(+id);

    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    return {
      layout: 'layouts/main',
      title: `Редактировать заказ #${order.id}`,
      order,
    };
  }

  @Post(':id')
  @Redirect('/orders')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    await this.ordersService.update(+id, dto);
  }

  @Post(':id/delete')
  @Redirect('/orders')
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(+id);
  }

  @Sse('events')
  getEvents(): Observable<any> {
    return this.ordersService.getEvents();
  }

  @Post('/api')
  async apiCreate(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Patch('/api/:id')
  async apiUpdate(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(+id, dto);
  }

  @Delete('/api/:id')
  async apiDelete(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
