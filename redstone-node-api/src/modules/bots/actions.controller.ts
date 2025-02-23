import { Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MineflayerService } from '../mineflayer/mineflayer.service';

@ApiTags('Actions')
@Controller('actions')
export class ActionsController {

    constructor (private service:MineflayerService) {}

    @Put('stopAll/:id')
    stopAll(@Param('id') id:number){
        return this.service.stopAll(id);
    }

    @Put('getWood/:id')
    getWood(@Param('id') id:number){
        return this.service.findWood(id);
    }

}
