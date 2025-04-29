import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Заказ' })
export class OrderGraphqlModel {
  @Field(() => Int, { description: 'Идентификатор заказа' })
  id: number;

  @Field(() => Int, {
    description: 'Идентификатор пользователя, сделавшего заказ',
  })
  userId: number;
}
