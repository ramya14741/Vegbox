import { ApiProperty } from "@nestjs/swagger";

export class deliveryPersonnelDto {
    @ApiProperty()
    readonly dpemail: string;
    @ApiProperty()
    readonly dpmobileNumber: Number;
    @ApiProperty()
    readonly dpId?: Number;
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly active?: string;
  }