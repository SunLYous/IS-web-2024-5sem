import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class OrderItemCreateInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  quantity: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  productId: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  orderId: number;
}
