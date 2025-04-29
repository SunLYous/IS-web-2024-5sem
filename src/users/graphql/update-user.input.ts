import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { IsOptional } from 'class-validator';

@InputType({ description: 'Данные для обновления пользователя' })
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { description: 'Идентификатор пользователя' })
  @IsOptional()
  id?: number;
}
