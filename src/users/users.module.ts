import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { UsersApiController } from './user.api.controller';
import { UsersResolver } from './user.resolver';

@Module({
  controllers: [UsersController, UsersApiController],
  providers: [UsersService, PrismaService, UsersResolver],
})
export class UsersModule {}
