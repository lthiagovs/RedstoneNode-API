import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from 'src/database/bot.entity';
import { MineflayerService } from '../mineflayer/mineflayer.service';
import { Connection } from 'src/database/connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bot, Connection])],
  controllers: [BotController],
  providers: [BotService, MineflayerService]
})
export class BotsModule {}
