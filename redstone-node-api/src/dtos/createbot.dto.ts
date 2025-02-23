import { ApiProperty } from "@nestjs/swagger";

export class CreateBotDto{

    @ApiProperty()
    username:string;

    @ApiProperty()
    connectionID:number;

}