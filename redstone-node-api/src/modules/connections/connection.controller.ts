import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ConnectionService } from './connection.service';
import { ConnectionDTO } from 'src/dtos/connection.dto';
import { CreateConnectionDto } from 'src/dtos/createconnection.dto';

@ApiTags("Connection")
@Controller('connection')
export class ConnectionController {

    constructor(private service:ConnectionService) {}

    @Get('/getAll')
    getAllConnection(){
        return this.service.getAll();
    }

    @ApiBody({type: CreateConnectionDto})
    @Post('/create')
    createConnection(@Body() connection:CreateConnectionDto){
        return this.service.createConnection(connection);
    }

    @Put()
    startConnection(){
        return this.service.startConnection();
    }

    @Put()
    shutdownConnection(){
        return this.service.shutdownConnection();
    }

    @Delete()
    deleteConnection(){
        return this.service.deleteConnection();
    }


}
