import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Пользователь' })
export class UserGraphqlModel {
  @Field(() => Int, { description: 'Идентификатор пользователя' })
  id: number;

  @Field({ description: 'Электронная почта пользователя' })
  email: string;

  @Field({ description: 'Имя пользователя' })
  name: string;
}
