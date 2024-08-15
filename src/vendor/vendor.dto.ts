import { ApiProperty } from '@nestjs/swagger';

export class vendorDto {
  @ApiProperty()
  readonly vendorId: number;
  @ApiProperty()
  readonly vendorName: string;
  @ApiProperty()
  readonly contactPersonName?: string;
  @ApiProperty()
  readonly contactEmail?: string;
  @ApiProperty()
  readonly contactMobile: string;
  @ApiProperty()
  readonly address?: string;
  @ApiProperty()
  readonly city?: string;
  @ApiProperty()
  readonly state?: string;
  @ApiProperty()
  readonly zip?: number;
  @ApiProperty()
  readonly country?: string;
  @ApiProperty()
  readonly businessName?: string;
  @ApiProperty()
  readonly businessRegistrationNumber?: string;
  @ApiProperty()
    readonly TAXIdorVatId?: string;
    @ApiProperty()
    readonly bankName?: string;
    @ApiProperty()
    readonly accountHolderName?: string;
    @ApiProperty()
    readonly accountNumber?: string;
    @ApiProperty()
    readonly IFSCCodeorRoutingNumber?: string;
    @ApiProperty()
    readonly paymentTerms?: string;
    @ApiProperty()
    readonly currency?: string;
    @ApiProperty()
    readonly active?: string;

}