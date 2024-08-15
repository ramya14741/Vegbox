import { ApiProperty } from "@nestjs/swagger";

export class directBuyDto {
    @ApiProperty()
    readonly directBuyId: number;
    @ApiProperty()
    readonly cartJson: [{
     productId: number,
     productName:string,
     quantitytypecode:number,
     unitchoosenbyUser:string,
     shortName: string
    }];
    @ApiProperty()
    readonly cartTotal: number;
    @ApiProperty()
    readonly cartTotalAfterDiscount?: number;
    @ApiProperty()
    readonly userid: string;
    @ApiProperty()
    readonly active?: string;
    @ApiProperty()
    readonly paidStatus?: string;
    @ApiProperty()
    readonly discountApplied?: string;
  }