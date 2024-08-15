import { ApiProperty } from "@nestjs/swagger";

export class returnreqDto {
    @ApiProperty()
    readonly returnId?: number;
    @ApiProperty()
    readonly orderId: number;
    @ApiProperty()
    readonly userId: string;
    @ApiProperty()
  readonly items: [{
   productId: number,
   productName:string,
   quantitytypecode:number,
   unitchoosenbyUser:string,
   shortName: string
  }];
  }

  export class returnreqItemDto {
    @ApiProperty()
    readonly returnReqItemId: number;
    @ApiProperty()
    readonly returnId: number;
    @ApiProperty()
    readonly productId: number;
    @ApiProperty()
    readonly status: string;
    @ApiProperty()
    readonly quantitytypecode: number;
    @ApiProperty()
    readonly unitchoosenbyUser: string;
  }