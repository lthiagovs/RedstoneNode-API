import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Connection } from "./connection.entity";

@Entity()
export class Bot{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()
    @Column()
    username:string;

    @ApiProperty()
    @Column({default: 0})
    posx:number;

    @ApiProperty()
    @Column({default: 0})
    posy:number;

    @ApiProperty()
    @Column({default: 100})
    health:number;

    @ApiProperty()
    @Column({default: 100})
    hunger:number;

    @ManyToOne(() => Connection, (connection) => connection.bots)
    connection: Connection;

}