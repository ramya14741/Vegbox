import { ApiProperty } from '@nestjs/swagger';

export class orderDto {
  @ApiProperty()
  readonly orderId: number;
  @ApiProperty()
  readonly cartId?: number;
  @ApiProperty()
  readonly directBuyId?: number;
  @ApiProperty()
  readonly userId: string;
  @ApiProperty()
  readonly productData: {};
  @ApiProperty()
  readonly paymentIntent: {};
  @ApiProperty()
  readonly orderStatus?: string;
  @ApiProperty()
  readonly paymentIntentClientSecret?: string;
  @ApiProperty()
  readonly webhookpaidStatus?: string;
  @ApiProperty()
  readonly invoiceId?: string;
  @ApiProperty()
  readonly deliveryPersonnelId?: number;
  @ApiProperty()
  readonly idshippingAddress?: number;
  @ApiProperty()
  readonly idbillingAddress?: number;
  
  
}

export class cashorderDto {
  @ApiProperty()
  readonly cartId: number;
  @ApiProperty()
  readonly productData: {};
  @ApiProperty()
  readonly userId: string;
}
