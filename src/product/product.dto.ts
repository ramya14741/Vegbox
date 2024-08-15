import { ApiProperty } from '@nestjs/swagger';

export class productDto {
  @ApiProperty()
  readonly productName: string;
  @ApiProperty()
  readonly productId?: number;
  @ApiProperty()
  readonly productslugName?: string;
  @ApiProperty()
  readonly active?: string;
  @ApiProperty()
  readonly productTamilName?: string;
  @ApiProperty()
  readonly productAlternativeName?: string;
  @ApiProperty()
  readonly categoryId: number;
  @ApiProperty()
  readonly QtyTypeCode: number;
  @ApiProperty()
  readonly calcBasedRateMaster: string;
  @ApiProperty()
  readonly barCode: string;
}