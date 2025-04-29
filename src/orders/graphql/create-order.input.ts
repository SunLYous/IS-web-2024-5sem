import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class OrderCreateInput {
  @Field(() => Int)
  @IsInt()
  userId: number;
}
