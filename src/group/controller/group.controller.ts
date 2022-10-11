import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddUserDTO } from '../dto/add-user.dto';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { Group } from '../group.entity';
import { GroupService } from '../service/group.service';

@Controller('api/v1/group/')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() group: CreateGroupDTO): Promise<Group> {
    return this.groupService.create(group, req.user);
  }
  @Get('get')
  @UseGuards(JwtAuthGuard)
  async get(): Promise<Group[]> {
    return this.groupService.get();
  }
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req, @Param('id') id: string): Promise<any> {
    return this.groupService.delete(id, req.user);
  }
  @Put('addUser/:id')
  @UseGuards(JwtAuthGuard)
  async addUser(
    @Request() req,
    @Body() addUser: AddUserDTO,
    @Param('id') id: number,
  ): Promise<any> {
    return this.groupService.addUser(addUser, id, req.user);
  }
}
