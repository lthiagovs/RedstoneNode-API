import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BotService } from './bot.service';
import { CreateBotDto } from 'src/dtos/createbot.dto';

@ApiTags("Bot")
@Controller('bot')
export class BotController {

    constructor(private service:BotService) {}

    @Get('getAll')
    getAll(){
        return this.service.getAll();
    }

    @Get('GetByID/:id')
    getByID(@Param('id') id:number){
        return this.service.getById(id);
    }

    @Post('create')
    @ApiBody({type: CreateBotDto})
    createBot(@Body() bot:CreateBotDto){
        return this.service.create(bot);
    }

    @Put('online/:id')
    online(@Param('id') id:number){
        return this.service.online(id);
    }


}
