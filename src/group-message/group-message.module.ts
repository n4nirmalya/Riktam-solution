import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { Group } from 'src/group/group.entity';
import { GroupMessageController } from './controller/group-message.controller';
import { GroupMessage } from './group-message.entity';
import { GroupMessageService } from './service/group-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Group, GroupMessage])],
  controllers: [GroupMessageController],
  providers: [GroupMessageService],
})
export class GroupMessageModule {}
