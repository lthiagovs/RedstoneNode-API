import { ConnectionDTO } from "./connection.dto";

export class BotDto{

    id:number;
    username:string;
    posx:number;
    posy:number;
    health:number;
    hunger:number;
    connection:ConnectionDTO;

}