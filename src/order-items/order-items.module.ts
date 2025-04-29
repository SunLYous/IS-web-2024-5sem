import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { PrismaService } from '../prisma.service';
import { OrderItemsApiController } from './order-items-api.controller';
import { OrderItemsResolver } from './order-items.resolver';

@Module({
  controllers: [OrderItemsController, OrderItemsApiController],
  providers: [OrderItemsService, PrismaService, OrderItemsResolver],
})
export class OrderItemsModule {}
