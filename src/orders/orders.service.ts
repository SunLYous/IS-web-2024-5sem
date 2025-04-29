import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Subject } from 'rxjs';

@Injectable()
export class OrdersService {
  private orderEvents = new Subject<any>();

  constructor(private prisma: PrismaService) {}

  getEvents() {
    return this.orderEvents.asObservable();
  }

  async create(data: CreateOrderDto) {
    const order = await this.prisma.order.create({ data });
    this.orderEvents.next({ type: 'created', order });
    return order;
  }

  findAll() {
    return this.prisma.order.findMany({ include: { user: true, items: true } });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true, items: true },
    });
  }

  async update(id: number, data: UpdateOrderDto) {
    const order = await this.prisma.order.update({ where: { id }, data });
    this.orderEvents.next({ type: 'updated', order });
    return order;
  }

  async remove(id: number) {
    const order = await this.prisma.order.delete({ where: { id } });
    this.orderEvents.next({ type: 'deleted', order });
    return order;
  }

  async paginate(page: number, limit: number): Promise<[any[], number]> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.order.count(),
    ]);
    return [data, total];
  }
}
