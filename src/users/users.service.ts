import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Subject } from 'rxjs';

@Injectable()
export class UsersService {
  private userEvents = new Subject<any>();

  constructor(private prisma: PrismaService) {}

  getEvents() {
    return this.userEvents.asObservable();
  }

  async create(data: CreateUserDto) {
    const user = await this.prisma.user.create({ data });
    this.userEvents.next({ type: 'created', user });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany({ include: { orders: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.update({ where: { id }, data });
    this.userEvents.next({ type: 'updated', user });
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({ where: { id } });
    this.userEvents.next({ type: 'deleted', user });
    return user;
  }

  async paginate(page: number, limit: number): Promise<[any[], number]> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);
    return [data, total];
  }
}
