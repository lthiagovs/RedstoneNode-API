import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'src/database/connection.entity';
import { CreateConnectionDto } from 'src/dtos/createconnection.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectionService {

    constructor(@InjectRepository(Connection) private repository: Repository<Connection>) {}

    getAll(){
        return this.repository.find();
    }

    async getById(id:number){
        const connection = await this.repository.findOne({
            where: { id: id },
        });

        if(!connection){
            throw new BadRequestException('connection not found');
        }

        return connection;

    }

    createConnection(connection:CreateConnectionDto){
        
        if(!connection){
            return new BadRequestException("invalid connection");
        }

        this.repository.create(connection);
        this.repository.save(connection);

    }

    startConnection(){

    }

    shutdownConnection(){

    }

    deleteConnection(){

    }

}
