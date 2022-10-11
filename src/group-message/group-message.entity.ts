import { Users } from 'src/auth/user.entity';
import { Group } from 'src/group/group.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class GroupMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToMany(() => Users, { eager: true })
  @JoinTable()
  likes: Users[];

  @ManyToOne(() => Group, (group: Group) => group.groupMessage)
  group: Group;

  @ManyToOne(() => Users, (user: Users) => user.groupMessage, { eager: true })
  sentBy: Users;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;
}
