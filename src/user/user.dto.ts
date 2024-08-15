import { ApiProperty } from '@nestjs/swagger';

export class userDto {
  @ApiProperty()
  readonly Useremail: string;
  @ApiProperty()
  readonly mobileNumber?: Number;
  @ApiProperty()
  readonly userid?: string;
  @ApiProperty()
  readonly firebaseuserid?: string;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly role: string;
  @ApiProperty()
  readonly password?: string;
}

export class adminloginDto {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password?: string;
}