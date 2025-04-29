import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType({ description: 'Данные для создания пользователя' })
export class CreateUserInput {
  @Field({ description: 'Электронная почта пользователя' })
  @IsEmail()
  email: string;

  @Field({ description: 'Имя пользователя' })
  @IsNotEmpty()
  name: string;
}
