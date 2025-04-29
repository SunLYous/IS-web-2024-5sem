import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './graphql/create-category.input';
import { UpdateCategoryInput } from './graphql/update-category.input';
import { CategoryGraphqlModel } from './graphql/category.graphql.model';

@Resolver(() => CategoryGraphqlModel)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => CategoryGraphqlModel)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryGraphqlModel> {
    return this.categoriesService.create(createCategoryInput);
  }

  @Mutation(() => CategoryGraphqlModel)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategoryGraphqlModel> {
    return this.categoriesService.update(id, updateCategoryInput);
  }

  @Query(() => [CategoryGraphqlModel])
  async categories(): Promise<CategoryGraphqlModel[]> {
    return this.categoriesService.findAll();
  }

  @Query(() => CategoryGraphqlModel, { nullable: true })
  async category(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CategoryGraphqlModel | null> {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => CategoryGraphqlModel, { nullable: true })
  async removeCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CategoryGraphqlModel | null> {
    return this.categoriesService.remove(id);
  }
}
