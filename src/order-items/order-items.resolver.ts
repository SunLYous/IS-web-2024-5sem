import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderItemsService } from './order-items.service';
import { OrderItemCreateInput } from './graphql/create-order-item.input';
import { OrderItemUpdateInput } from './graphql/update-order-item.input';
import { OrderItemGraphqlModel } from './graphql/order-item.entity';

@Resolver(() => OrderItemGraphqlModel)
export class OrderItemsResolver {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Mutation(() => OrderItemGraphqlModel)
  async createOrderItem(
    @Args('createOrderItemInput') createOrderItemInput: OrderItemCreateInput,
  ) {
    return this.orderItemsService.create(createOrderItemInput);
  }

  @Mutation(() => OrderItemGraphqlModel)
  async updateOrderItem(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOrderItemInput') updateOrderItemInput: OrderItemUpdateInput,
  ) {
    return this.orderItemsService.update(id, updateOrderItemInput);
  }

  @Query(() => [OrderItemGraphqlModel])
  async orderItems() {
    return this.orderItemsService.findAll();
  }

  @Query(() => OrderItemGraphqlModel)
  async orderItem(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemsService.findOne(id);
  }

  @Mutation(() => OrderItemGraphqlModel)
  async removeOrderItem(@Args('id', { type: () => Int }) id: number) {
    return this.orderItemsService.remove(id);
  }
}
