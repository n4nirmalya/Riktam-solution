import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { Group } from 'src/group/group.entity';
import { Repository } from 'typeorm';
import { AddMessageDTO } from '../dto/add-message.dto';
import { GroupMessage } from '../group-message.entity';

@Injectable()
export class GroupMessageService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(GroupMessage)
    private groupMessageRepository: Repository<GroupMessage>,
  ) {}
  async addMessage(
    groupMessage: AddMessageDTO,
    user: Users,
  ): Promise<GroupMessage> {
    if (user.role === 'user') {
      const group = await this.groupRepository.findOne({
        where: { id: groupMessage.groupId },
      });
      const userData = await this.userRepository.findOne({
        where: {
          id: user.id,
        },
      });
      return await this.groupMessageRepository.save({
        message: groupMessage.message,
        sentBy: userData,
        group: group,
      });
    }
    throw new UnauthorizedException();
  }
  async getMessageByGroupId(id: number): Promise<Group> {
    return await this.groupRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        groupMessage: true,
      },
    });
  }
  async addLike(id: number, user: any): Promise<GroupMessage> {
    if (user.role === 'user') {
      const userData = await this.userRepository.find({
        where: {
          id: user.userId,
        },
      });
      const groupMessage = await this.groupMessageRepository.findOne({
        where: {
          id: id,
        },
      });
      const previousLikes = groupMessage.likes || [];
      return await this.groupMessageRepository.save({
        ...groupMessage,
        likes: [...previousLikes, ...userData],
      });
    }
    throw new UnauthorizedException();
  }
  async removeLike(id: number, user: any): Promise<GroupMessage> {
    if (user.role === 'user') {
      const groupMessage = await this.groupMessageRepository.findOne({
        where: {
          id: id,
        },
      });
      const removedLike = groupMessage.likes.filter(
        (like) => like.id !== user.userId,
      );
      return await this.groupMessageRepository.save({
        ...groupMessage,
        likes: removedLike,
      });
    }
    throw new UnauthorizedException();
  }
}
