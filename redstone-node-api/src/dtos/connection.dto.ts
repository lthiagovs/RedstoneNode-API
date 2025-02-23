import { ApiProperty } from "@nestjs/swagger";

export class ConnectionDTO{

    @ApiProperty()
    id:number;

    @ApiProperty()
    host:string;

    @ApiProperty()
    port:number;

}