import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CacheModule } from '@nestjs/common/cache';
import { StorageModule } from './storage/storage.module';
import { NpmService } from './audit/npm/npm.service';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 5,
        max: 10,
        isGlobal: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      sortSchema: true,
    }),
    ProductsModule,
    CategoriesModule,
    UsersModule,
    OrdersModule,
    OrderItemsModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, NpmService, S3Service, S3Service],
})
export class AppModule {}
