import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotsModule } from './bots/bots.module';
import { ScriptsModule } from './scripts/scripts.module';
import { ConnectionsModule } from './connections/connections.module';
import { ConnectionController } from './connection/connection.controller';

@Module({
  imports: [BotsModule, ScriptsModule, ConnectionsModule],
  controllers: [AppController, ConnectionController],
  providers: [AppService],
})
export class AppModule {}
