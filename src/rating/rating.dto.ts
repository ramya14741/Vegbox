import { ApiProperty } from '@nestjs/swagger';

export class ratingDto {
  @ApiProperty()
  readonly rateId?: number;
  @ApiProperty()
  readonly productId: number;
  @ApiProperty()
  readonly rating: number;
  @ApiProperty()
  readonly postedBy: string;
}