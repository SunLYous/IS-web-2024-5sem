import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field({ description: 'Название категории', nullable: true })
  name?: string;
}
