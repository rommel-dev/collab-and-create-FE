import { ITaskColumn } from './task-column.interface';
import { IUser } from './user.interface';

export interface IProject {
  _id: string;
  projectName: string;
  description: string;
  status: string;
  techStacks: string[];
  createdBy: IUser;
  unconfirmedMembers: IUser[];
  confirmedMembers: IUser[];
  rejectedInviteMembers: IUser[];
  taskColumns: ITaskColumn[];
  createdAt: Date;
  updatedAt: Date;
}
