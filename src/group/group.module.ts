import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { GroupController } from './controller/group.controller';
import { Group } from './group.entity';
import { GroupService } from './service/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Group])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
