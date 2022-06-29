import { ITask } from './task.interface';
import { IUser } from './user.interface';

export interface ITaskColumn {
  _id: string;
  columnName: string;
  sequence: number;
  createdBy: IUser;
  tasks: ITask[];
  createdAt?: Date;
  updatedAt?: Date;
}
