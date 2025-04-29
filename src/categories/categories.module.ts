import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../prisma.service';
import { CategoriesApiController } from './categories.api.controller';
import { CategoriesResolver } from './categories.resolver';

@Module({
  controllers: [CategoriesController, CategoriesApiController],
  providers: [CategoriesService, PrismaService, CategoriesResolver],
  exports: [CategoriesService],
})
export class CategoriesModule {}
