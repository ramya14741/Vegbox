import { ApiProperty } from '@nestjs/swagger';

export class productrateDto {
  @ApiProperty()
  readonly productId?: number;
  @ApiProperty()
  readonly quantitycode?: number;
  @ApiProperty()
  readonly quantityuserchoosen?:string;
}