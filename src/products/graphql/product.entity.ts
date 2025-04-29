import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CategoryGraphqlModel } from 'src/categories/graphql/category.graphql.model';

@ObjectType({ description: 'Продукт' })
export class ProductGraphqlModel {
  @Field(() => Int, { description: 'Идентификатор продукта' })
  id: number;

  @Field({ description: 'Название продукта' })
  name: string;

  @Field(() => Float, { description: 'Цена продукта' })
  price: number;

  @Field(() => CategoryGraphqlModel, { description: 'Категория продукта' })
  category: CategoryGraphqlModel;

  @Field(() => Int, { description: 'Идентификатор категории продукта' })
  categoryId: number;
}
