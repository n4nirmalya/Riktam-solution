import { Users } from 'src/auth/user.entity';
import { GroupMessage } from 'src/group-message/group-message.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  groupName: string;

  @ManyToMany(() => Users)
  @JoinTable()
  users: Users[];

  @OneToMany(
    () => GroupMessage,
    (groupMessage: GroupMessage) => groupMessage.group,
  )
  groupMessage: GroupMessage;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;
}
