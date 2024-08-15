import { ApiProperty } from '@nestjs/swagger';

export class rateMasterDto {
  @ApiProperty()
  readonly rateMasterId: number;
  @ApiProperty()
  readonly productId?: number;
  @ApiProperty()
  readonly buyRate: number;
  @ApiProperty()
  readonly sellMarginPer: number;
  @ApiProperty()
  readonly sellRate: number;
  @ApiProperty()
  readonly ratecode: number;
}