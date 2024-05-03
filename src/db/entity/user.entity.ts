import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ParseRequest } from './parse-requests.entity.js';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ParseRequest, (parseRequest) => parseRequest.user)
  parseRequests: ParseRequest[];

  @Column()
  createdAt: Date;
}
