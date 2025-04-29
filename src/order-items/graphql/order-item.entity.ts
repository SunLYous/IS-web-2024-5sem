import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Позиция заказа' })
export class OrderItemGraphqlModel {
  @Field(() => Int, { description: 'Идентификатор позиции заказа' })
  id: number;

  @Field(() => Int, { description: 'Количество товаров' })
  quantity: number;

  @Field(() => Int, { description: 'Идентификатор товара' })
  productId: number;

  @Field(() => Int, { description: 'Идентификатор заказа' })
  orderId: number;
}
