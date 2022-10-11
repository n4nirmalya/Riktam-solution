import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Group } from 'src/group/group.entity';
import { AddMessageDTO } from '../dto/add-message.dto';
import { GroupMessage } from '../group-message.entity';
import { GroupMessageService } from '../service/group-message.service';

@Controller('api/v1/group-message/')
export class GroupMessageController {
  constructor(private groupMessageService: GroupMessageService) {}

  @Post('addMessage')
  @UseGuards(JwtAuthGuard)
  async addMessage(
    @Request() req,
    @Body() groupMessage: AddMessageDTO,
  ): Promise<GroupMessage> {
    return this.groupMessageService.addMessage(groupMessage, req.user);
  }
  @Get('getMessageByGroupId/:id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: number): Promise<Group> {
    return this.groupMessageService.getMessageByGroupId(id);
  }
  //   @Delete('delete/:id')
  //   @UseGuards(JwtAuthGuard)
  //   async delete(@Request() req, @Param('id') id: string): Promise<any> {
  //     return this.groupService.delete(id, req.user);
  //   }
  @Put('like/:id')
  @UseGuards(JwtAuthGuard)
  async addLike(@Request() req, @Param('id') id: number): Promise<any> {
    return this.groupMessageService.addLike(id, req.user);
  }
  @Put('dislike/:id')
  @UseGuards(JwtAuthGuard)
  async removeLike(@Request() req, @Param('id') id: number): Promise<any> {
    return this.groupMessageService.removeLike(id, req.user);
  }
}
