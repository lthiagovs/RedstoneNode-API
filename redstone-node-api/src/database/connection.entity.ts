import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bot } from "./bot.entity";

@Entity()
export class Connection{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()
    @Column()
    host:string;

    @ApiProperty()
    @Column()
    port:number;

    @OneToMany(() => Bot, (bot) => bot.connection)  // Relacionamento com a entidade Bot
    bots: Bot[];

}