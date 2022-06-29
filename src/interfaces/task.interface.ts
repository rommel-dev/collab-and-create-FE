import { IUser } from './user.interface';

export interface ITask {
  _id: string;
  description: string;
  createdBy: IUser;
  inCharge: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}
