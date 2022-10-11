import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { In, Repository } from 'typeorm';
import { AddUserDTO } from '../dto/add-user.dto';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { Group } from '../group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(group: CreateGroupDTO, user: Users): Promise<Group> {
    if (user.role === 'user') {
      const users = await this.userRepository.find({
        where: { username: In(group.usernames) },
      });
      return await this.groupRepository.save({
        ...group,
        users: users,
      });
    }
    throw new UnauthorizedException();
  }
  async get(): Promise<Group[]> {
    return await this.groupRepository.find({
      relations: {
        users: true,
      },
    });
  }
  async delete(id: string, user: Users): Promise<any> {
    if (user.role === 'user') {
      return await this.groupRepository.delete(id);
    }
    throw new UnauthorizedException();
  }
  async addUser(addUser: AddUserDTO, id: number, user: Users): Promise<any> {
    if (user.role === 'user') {
      const users = await this.userRepository.find({
        where: { username: In(addUser.usernames) },
      });
      const group = await this.groupRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          users: true,
        },
      });
      return await this.groupRepository.save({
        ...group,
        users: [...users, ...group.users],
      });
    }
    throw new UnauthorizedException();
  }
}
