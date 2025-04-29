import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Subject } from 'rxjs';

@Injectable()
export class OrderItemsService {
  private orderItemEvents = new Subject<any>();

  constructor(private prisma: PrismaService) {}

  getEvents() {
    return this.orderItemEvents.asObservable();
  }

  async create(data: CreateOrderItemDto) {
    const item = await this.prisma.orderItem.create({ data });
    this.orderItemEvents.next({ type: 'created', item });
    return item;
  }

  findAll() {
    return this.prisma.orderItem.findMany({
      include: { product: true, order: true },
    });
  }

  findOne(id: number) {
    return this.prisma.orderItem.findUnique({
      where: { id },
      include: { product: true, order: true },
    });
  }

  async update(id: number, data: UpdateOrderItemDto) {
    const item = await this.prisma.orderItem.update({ where: { id }, data });
    this.orderItemEvents.next({ type: 'updated', item });
    return item;
  }

  async remove(id: number) {
    const item = await this.prisma.orderItem.delete({ where: { id } });
    this.orderItemEvents.next({ type: 'deleted', item });
    return item;
  }
}
