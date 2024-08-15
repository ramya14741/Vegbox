import { ApiProperty } from "@nestjs/swagger";

export class AddressDto{
    @ApiProperty()
    readonly idAddress?:number;
    @ApiProperty()
    readonly addressType?:string;
    @ApiProperty()
    readonly name:string;
    @ApiProperty()
    readonly addressLine1:string;
    @ApiProperty()
    readonly addressLine2?:string;
    @ApiProperty()
    readonly city:string;
    @ApiProperty()
    readonly state:string;
    @ApiProperty()
    readonly zip:number;
    // mobileNumber?:string;
    // email?:string;
    @ApiProperty()
    readonly userid:string;
    @ApiProperty()
    readonly Customer_mobileNumber: string;
    @ApiProperty()
    readonly Customer_email?: string;
    @ApiProperty()
    readonly active?:string
}