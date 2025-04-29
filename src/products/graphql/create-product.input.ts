import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class ProductCreateInput {
  @Field({ description: 'Название продукта' })
  name: string;

  @Field(() => Float, { description: 'Цена продукта' })
  price: number;

  @Field(() => Int, { description: 'Идентификатор категории продукта' })
  categoryId: number;

  @Field({ nullable: true, description: 'URL изображения продукта' })
  image?: string;
}
