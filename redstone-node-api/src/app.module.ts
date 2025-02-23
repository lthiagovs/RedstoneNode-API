import { Module } from '@nestjs/common';
import { BotsModule } from './modules/bots/bots.module';
import { ConnectionsModule } from './modules/connections/connections.module';
import { ConnectionController } from './modules/connections/connection.controller';
import { ConnectionService } from './modules/connections/connection.service';
import { BotService } from './modules/bots/bot.service';
import { BotController } from './modules/bots/bot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './database/connection.entity';
import { Bot } from './database/bot.entity';
import { MineflayerService } from './modules/mineflayer/mineflayer.service';
import { ActionsController } from './modules/bots/actions.controller';

@Module({
  imports: [BotsModule, ConnectionsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'node',
      password: 'node',
      database: 'rednode',
      entities: [Connection, Bot],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Connection, Bot]), BotsModule
  ],
  controllers: [ConnectionController,BotController, ActionsController],
  providers: [ConnectionService, BotService, MineflayerService],
})
export class AppModule {}
