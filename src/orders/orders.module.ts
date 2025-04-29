import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../prisma.service';
import { OrdersApiController } from './orders-api.controller';
import { OrdersResolver } from './orders.resolver';

@Module({
  controllers: [OrdersController, OrdersApiController],
  providers: [OrdersService, PrismaService, OrdersResolver],
})
export class OrdersModule {}
