import { ApiProperty } from "@nestjs/swagger";

export class wishListDto {
    @ApiProperty()
    readonly wishId: number;
    @ApiProperty()
    readonly userId: string;
    @ApiProperty()
    readonly productData: {};
  }