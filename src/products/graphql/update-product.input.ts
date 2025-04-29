import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType({ description: 'Входные данные для обновления продукта' })
export class ProductUpdateInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field({ nullable: true })
  image?: string;
}
