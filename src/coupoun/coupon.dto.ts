import { ApiProperty } from '@nestjs/swagger';

export class couponDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly expiry?: Date;
  @ApiProperty()
  readonly discount?: number;
  @ApiProperty()
  readonly couponid: number;
  @ApiProperty()
  readonly active: string;
}