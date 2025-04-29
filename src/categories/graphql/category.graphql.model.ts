import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Категория' })
export class CategoryGraphqlModel {
  @Field(() => Int, { description: 'Идентификатор категории' })
  id: number;

  @Field({ description: 'Название категории' })
  name: string;
}
