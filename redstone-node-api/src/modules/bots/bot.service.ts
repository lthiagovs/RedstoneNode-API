import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from 'src/database/bot.entity';
import { CreateBotDto } from 'src/dtos/createbot.dto';
import { Repository } from 'typeorm';
import { MineflayerService } from '../mineflayer/mineflayer.service';
import { BotDto } from 'src/dtos/bot.dto';
import { Connection } from 'src/database/connection.entity';


@Injectable()
export class BotService{

    constructor(@InjectRepository(Bot) private repository:Repository<Bot>,
                @InjectRepository(Connection) private connectionRepository: Repository<Connection>,
                private service:MineflayerService) {}

    getAll(){
        return this.repository.find();
    }

    getAllByConnection(){

    }

    async getById(id:number){
        const bot = await this.repository.findOne({
            where: { id: id },
            relations: ['connection'],
        });

        if(!bot){
            throw new BadRequestException('not found');
        }

        return bot;

    }

    async getConnectionByID(id:number){

    }

    async create(bot:CreateBotDto): Promise<Bot>{

        if(!bot){
            throw new BadRequestException('invalid bot');
        }

        const connection = await this.connectionRepository.findOne({
            where: { id: bot.connectionID },
          });

        if (!connection) {
            throw new BadRequestException('invalid connection id');
        }

        const new_bot = this.repository.create({
            username: bot.username,
            connection,
        });

        return this.repository.save(new_bot);
    }

    async online(id:number){

        const bot = await this.getById(id);
        return await this.service.startBot(bot);
        
    }

    delete(){

    }

}
