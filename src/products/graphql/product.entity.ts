import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CategoryGraphqlModel } from 'src/categories/graphql/category.graphql.model';

@ObjectType({ description: 'Продукт' })
export class ProductGraphqlModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  categoryId: number;

  @Field(() => CategoryGraphqlModel)
  category: CategoryGraphqlModel;

  @Field({ nullable: true })
  image?: string;
}
