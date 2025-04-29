import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Subject } from 'rxjs';

@Injectable()
export class CategoriesService {
  private categoryEvents = new Subject<any>();

  constructor(private prisma: PrismaService) {}

  getEvents() {
    return this.categoryEvents.asObservable();
  }

  async create(data: CreateCategoryDto) {
    const category = await this.prisma.category.create({ data });
    this.categoryEvents.next({ type: 'created', category });
    return category;
  }

  findAll() {
    return this.prisma.category.findMany({ include: { products: true } });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.prisma.category.update({ where: { id }, data });
    this.categoryEvents.next({ type: 'updated', category });
    return category;
  }

  async remove(id: number) {
    const category = await this.prisma.category.delete({ where: { id } });
    this.categoryEvents.next({ type: 'deleted', category });
    return category;
  }

  async paginate(page: number, limit: number): Promise<[any[], number]> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.category.count(),
    ]);
    return [data, total];
  }
}
