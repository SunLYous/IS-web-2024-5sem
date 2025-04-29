import { InputType, Field, Int } from '@nestjs/graphql';

@InputType({ description: 'Входные данные для обновления продукта' })
export class ProductUpdateInput {
  @Field(() => Int, { description: 'Идентификатор продукта' })
  id: number;

  @Field({ description: 'Название продукта' })
  name: string;

  @Field({ description: 'Описание продукта' })
  description: string;

  @Field({ description: 'Цена продукта' })
  price: number;

  @Field({ description: 'Идентификатор категории продукта' })
  categoryId: number;
}
