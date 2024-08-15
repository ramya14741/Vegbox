import { ApiProperty } from '@nestjs/swagger';

export class categoryDto {
  @ApiProperty()
  readonly categoryName: string;
  @ApiProperty()
  readonly categoryId?: number;
  @ApiProperty()
  readonly slugName?: string;
  @ApiProperty()
  readonly active?: string;
}