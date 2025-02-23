import { BadRequestException, Injectable } from '@nestjs/common';
import { Bot } from 'src/database/bot.entity';
import { BotData } from './botdata';
import { goals } from "mineflayer-pathfinder";
import minecraftData from "minecraft-data";

@Injectable()
export class MineflayerService {

    constructor() {}

    private readonly mineflayer = require('mineflayer');
    private activeBots:BotData[] = [];

    async startBot(targetBot:Bot){

        const bot = this.mineflayer.createBot({
            host: targetBot.connection.host,
            port: targetBot.connection.port,
            username: targetBot.username,
            password: '',
        });

        if(!bot){
            return new BadRequestException('something went wrong,');
        }

        const botData:BotData = {
            data:bot,
            id:targetBot.id
        }

        this.activeBots.push(botData);
        return botData;

    }

    private getBotByID(id:number){
        return this.activeBots.find(bot => bot.id == id);
    }

    //BOT SCRIPTS

    stopAll(id:number) {

        const bot = this.getBotByID(id);

        if(!bot){
            throw new BadRequestException('bot not found');
        }

        bot.data.pathfinder.setGoal(null);
        bot.data.clearControlStates();
        bot.data.chat("Parando todas as ações...");
    }

    async findWood(id:number) {

        const bot = this.getBotByID(id);

        if(!bot){
            throw new BadRequestException('bot not found');
        }

        return new Promise<void>(async (resolve) => {
            try {
                const mcData = require('minecraft-data')(bot.data.version);
                const { GoalBlock } = goals;
    
                const woodBlocks = ['oak_log', 'spruce_log', 'birch_log', 'jungle_log', 'acacia_log', 'dark_oak_log'];
    
                const block = bot.data.findBlock({
                    matching: (b) => woodBlocks.includes(mcData.blocks[b.type].name),
                    maxDistance: 32
                });
    
                if (!block) {
                    bot.data.chat("Não encontrei madeira por perto!");
                    return resolve();
                }
    
                bot.data.chat(`Madeira encontrada em ${block.position.toString()}, indo até lá...`);
                await bot.data.pathfinder.goto(new GoalBlock(block.position.x, block.position.y, block.position.z));
    
                bot.data.chat("Cheguei na madeira, começando a quebrar...");
                await bot.data.dig(block);
                bot.data.chat("Madeira coletada!");
    
                resolve();
            } catch (error) {
                console.error("Erro ao procurar madeira:", error);
                resolve();
            }
        });
    }
    

}
