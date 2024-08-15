import { ApiProperty } from "@nestjs/swagger";

export class promotionDto {
    @ApiProperty()
    readonly promotionId: number;
    @ApiProperty()
    readonly promotionName?: string;
    @ApiProperty()
    readonly promotionDescription?: string;
    @ApiProperty()
    readonly active?: string;
    @ApiProperty()
    readonly discount?: number;
    @ApiProperty()
    readonly expiry?: Date;
  }