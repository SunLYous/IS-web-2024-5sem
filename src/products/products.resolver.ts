import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductCreateInput } from './graphql/create-product.input';
import { ProductUpdateInput } from './graphql/update-product.input';
import { ProductGraphqlModel } from './graphql/product.entity';

@Resolver(() => ProductGraphqlModel)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => ProductGraphqlModel)
  async createProduct(
    @Args('createProductInput') createProductInput: ProductCreateInput,
  ): Promise<ProductGraphqlModel> {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => ProductGraphqlModel)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: ProductUpdateInput,
  ): Promise<ProductGraphqlModel> {
    return this.productsService.update(id, updateProductInput);
  }

  @Query(() => [ProductGraphqlModel])
  async products(): Promise<ProductGraphqlModel[]> {
    return this.productsService.findAll();
  }

  @Query(() => ProductGraphqlModel, { nullable: true })
  async product(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ProductGraphqlModel | null> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => ProductGraphqlModel)
  async removeProduct(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ProductGraphqlModel> {
    return this.productsService.remove(id);
  }
}
