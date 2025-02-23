import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'src/database/connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  providers: [ConnectionService]
})
export class ConnectionsModule {}
