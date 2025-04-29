import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID пользователя, который создает заказ',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
