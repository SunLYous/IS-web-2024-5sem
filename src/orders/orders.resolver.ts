import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { OrderCreateInput } from './graphql/create-order.input';
import { OrderUpdateInput } from './graphql/update-order.input';
import { OrderGraphqlModel } from './graphql/order.entity';

@Resolver(() => OrderGraphqlModel)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => OrderGraphqlModel)
  async createOrder(
    @Args('createOrderInput') createOrderInput: OrderCreateInput,
  ) {
    return this.ordersService.create(createOrderInput);
  }

  @Mutation(() => OrderGraphqlModel)
  async updateOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOrderInput') updateOrderInput: OrderUpdateInput,
  ) {
    return this.ordersService.update(id, updateOrderInput);
  }

  @Query(() => [OrderGraphqlModel])
  async orders() {
    return this.ordersService.findAll();
  }

  @Query(() => OrderGraphqlModel)
  async order(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => OrderGraphqlModel)
  async removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.remove(id);
  }
}
