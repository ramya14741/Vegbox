import { ApiProperty } from "@nestjs/swagger";

export class replacereqItemDto {
    @ApiProperty()
    readonly replaceId?: number;
    @ApiProperty()
    readonly orderId: number;
    @ApiProperty()
    readonly productId: number;
    @ApiProperty()
    readonly status: string;
    @ApiProperty()
    readonly quantitytypecode: number;
    @ApiProperty()
    readonly unitchoosenbyUser: string;
  }