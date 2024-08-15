import { ApiProperty } from '@nestjs/swagger';

export class productimagesDto {
  @ApiProperty()
  readonly productImageName: string;
  @ApiProperty()
  readonly imageId?: number;
  @ApiProperty()
  readonly productId?: number;
  @ApiProperty()
  readonly promotionId?: number;
  @ApiProperty()
  readonly publicId: string;
  @ApiProperty()
  readonly url: string;
  @ApiProperty()
  readonly secureUrl: string;
  @ApiProperty()
  readonly active?: string;
}