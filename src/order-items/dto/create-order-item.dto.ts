import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Количество товара в заказе',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'ID продукта, который добавляется в заказ',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'ID заказа, к которому привязан элемент',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  orderId: number;
}
