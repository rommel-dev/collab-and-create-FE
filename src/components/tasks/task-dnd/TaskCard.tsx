import { IUser } from 'interfaces/user.interface';
import React from 'react';

const TaskCard = ({ columnId, taskId, description, photo, createdAt, inCharge, isDragging }: any) => {
  return (
    <li className={`${isDragging ? 'bg-green-300' : 'bg-white'} rounded-sm shadow`}>
      <div>
        <div className="bg-gray-500 dark:bg-black flex justify-between rounded-t-sm items-center p-1">
          <p className="text-xs text-gray-300 font-normal">{new Date(createdAt).toLocaleString()}</p>
          {/* <TaskMenu taskId={taskId} description={description} inCharge={inCharge} columnId={columnId} /> */}
        </div>
        <div className="p-2">
          <div className="my-2 flex flex-wrap">
            <p className="text-sm font-medium">{description}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs">In Charge:</p>
              <div className="flex flex-row">
                {inCharge.map((user: IUser, index: number) => {
                  return <img key={user._id} className={`${index > 0 ? '-ml-2' : ''} h-5 w-5 rounded-full object-cover border border-white`} src={user.photo} alt="profile" />;
                })}
              </div>
            </div>
            <div>
              <p className="text-xs">Created by:</p>
              <img className="h-5 w-5 rounded-full object-cover border-white" src={photo} alt="profile" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
