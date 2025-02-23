import { BadRequestException, Injectable } from '@nestjs/common';
import { Bot } from 'src/database/bot.entity';
import { BotData } from './botdata';
import { pathfinder, Movements, goals } from 'mineflayer-pathfinder';
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
            id:targetBot.id,
            stopped:true
        }

        this.activeBots.push(botData);
        return botData;

    }

    private getBotByID(id:number){
        return this.activeBots.find(bot => bot.id == id);
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private changeBotState(id:number, state:boolean){
        const index = this.activeBots.findIndex(bot => bot.id == id);
        this.activeBots[index].stopped = state;
    }

    //BOT SCRIPTS

    stopAll(id: number) {
        const bot = this.getBotByID(id);
    
        if (!bot) {
            throw new BadRequestException('bot not found');
        }
    
        bot.data.pathfinder.setGoal(null);
        bot.data.pathfinder.stop();
    
        bot.data.clearControlStates();
        this.changeBotState(id, true);
    
        if (bot.data.digging) {
            bot.data.digging = null;
        }
    
        if (bot.data.attacking) {
            bot.data.attacking = null;
        }
    
        // Resposta de parada
        bot.data.chat("Parando todas as ações...");
    }    

    async findWood(id: number) {
        const bot = this.getBotByID(id);
        this.changeBotState(id, false);
    
        if (!bot) {
            throw new BadRequestException('Bot not found');
        }
    
        if (!bot.data.pathfinder) {
            bot.data.loadPlugin(pathfinder);
        }
    
        setImmediate(async () => {
            try {
                const mcData = require('minecraft-data')(bot.data.version);
                const { GoalBlock } = goals;
    
                const woodBlocks = ['oak_log', 'spruce_log', 'birch_log', 'jungle_log', 'acacia_log', 'dark_oak_log'];
    
                while (!this.getBotByID(id)?.stopped) {
                    const block = bot.data.findBlock({
                        matching: (b) => woodBlocks.includes(mcData.blocks[b.type].name),
                        maxDistance: 32
                    });
    
                    if (!block) {
                        await this.sleep(2000);
                        continue;
                    }

                    const movements = new Movements(bot.data);
                    bot.data.pathfinder.setMovements(movements);
    
                    try {
                        await bot.data.pathfinder.goto(new GoalBlock(block.position.x, block.position.y, block.position.z));
                        await bot.data.dig(block);
                    } catch (pathfinderError) {
                        if (pathfinderError.message.includes('Took too long to decide path to goal')) {
                            console.log("Erro de timeout no pathfinder. Tentando novamente...");
                        } else {
                            console.error("Erro ao procurar caminho:", pathfinderError);
                        }
                        await this.sleep(2000);
                        continue;
                    }

                    await this.sleep(2000);
                }
            } catch (error) {
                console.error("Erro ao procurar madeira:", error);
            }
        });
    }
    

}
