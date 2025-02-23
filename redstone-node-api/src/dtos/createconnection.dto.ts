import { ApiProperty } from "@nestjs/swagger";

export class CreateConnectionDto{

    @ApiProperty()
    host:string;
    
    @ApiProperty()
    port:number;

}