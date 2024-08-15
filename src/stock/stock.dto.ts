import { ApiProperty } from '@nestjs/swagger';

export class stockDto {
  @ApiProperty()
  readonly stockId: number;
  @ApiProperty()
  readonly productId: number;
  @ApiProperty()
  readonly TotalQuantity: number;
  @ApiProperty()
  readonly PurchaseRate?: number;
  @ApiProperty()
  readonly MRP?: number;
  @ApiProperty()
  readonly sellRate?: number;
  @ApiProperty()
  readonly sellMarginPerc?: number;
  @ApiProperty()
  readonly DiscountPerc?: number;
  @ApiProperty()
  readonly active?: string;
  @ApiProperty()
  readonly DiscountRate?: number;
  @ApiProperty()
  readonly soldQuantity?: number;
  @ApiProperty()
  readonly reserveQuantity?: number;
  @ApiProperty()
    readonly promotionId?: number;
    @ApiProperty()
    readonly vendorId?: number;
}