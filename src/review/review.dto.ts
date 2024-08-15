import { ApiProperty } from "@nestjs/swagger";

export class reviewDto {
    @ApiProperty()
    readonly reviewId?: number;
    @ApiProperty()
    readonly productId: number;
    @ApiProperty()
    readonly reviewText: string;
    @ApiProperty()
    readonly postedBy: string;
  }