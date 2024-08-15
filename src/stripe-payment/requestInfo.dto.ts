import { ApiProperty } from "@nestjs/swagger";

export class requestInfodto {
    @ApiProperty()
    readonly courseId: string;
}