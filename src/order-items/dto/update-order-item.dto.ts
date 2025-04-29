import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiProperty({
    description: 'Количество товара в заказе (не обязательное для обновления)',
    example: 3,
    required: false,
  })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description:
      'ID продукта, который добавляется в заказ (не обязательное для обновления)',
    example: 2,
    required: false,
  })
  @IsInt()
  @IsOptional()
  productId?: number;

  @ApiProperty({
    description:
      'ID заказа, к которому привязан элемент (не обязательное для обновления)',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  orderId?: number;
}
