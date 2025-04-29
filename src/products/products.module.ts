import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';
import { ProductsApiController } from './products-api.controller';
import { ProductsResolver } from './products.resolver';

@Module({
  controllers: [ProductsController, ProductsApiController],
  providers: [ProductsService, PrismaService, ProductsResolver],
  exports: [ProductsService],
})
export class ProductsModule {}
