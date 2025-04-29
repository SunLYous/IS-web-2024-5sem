import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {
  private productEvents = new Subject<any>();

  constructor(private prisma: PrismaService) {}

  getEvents() {
    return this.productEvents.asObservable();
  }

  async create(data: CreateProductDto) {
    const product = await this.prisma.product.create({
      data,
      include: { category: true },
    });
    this.productEvents.next({ type: 'created', product });
    return product;
  }

  findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: number, data: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
    this.productEvents.next({ type: 'updated', product });
    return product;
  }

  async remove(id: number) {
    const product = await this.prisma.product.delete({
      where: { id },
      include: { category: true },
    });
    this.productEvents.next({ type: 'deleted', product });
    return product;
  }

  async paginate(page: number, limit: number): Promise<[any[], number]> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { category: true },
      }),
      this.prisma.product.count(),
    ]);
    return [data, total];
  }
}
