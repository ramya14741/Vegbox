import { ApiProperty } from '@nestjs/swagger';

export class productfilterDto {
  @ApiProperty()
  readonly searchText?: string;
  @ApiProperty()
  readonly price?: [];
  @ApiProperty()
  readonly category?: [];
  @ApiProperty()
  readonly rating?: [
    "productid","rating"];
}

export class productfiltertextPriceDto {
  @ApiProperty()
  readonly searchText: string;
  @ApiProperty()
  readonly price: [];
}

// export class productfiltercategoryPriceDto {
//   @ApiProperty()
//   readonly categoryId: number;
//   @ApiProperty()
//   readonly price: [];
// }

// export class productfiltercategorypriceratingDto {
//   @ApiProperty()
//   readonly categoryId: number;
//   @ApiProperty()
//   readonly price: [];
//   @ApiProperty()
//   readonly rating: number;
// }


export class productfiltertextpriceratingDto {
  @ApiProperty()
  readonly searchText: string;
  @ApiProperty()
  readonly price: [];
  @ApiProperty()
  readonly rating: number;
}

export class productfiltercategoryPriceDto {
  @ApiProperty()
  readonly categoryId: number;
  @ApiProperty()
  readonly price: [];
}

export class productfiltercategorypriceratingDto {
  @ApiProperty()
  readonly categoryId: number;
  @ApiProperty()
  readonly price: [];
  @ApiProperty()
  readonly rating: number;
}