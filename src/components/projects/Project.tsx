import React, { useEffect, useState } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import { VscChecklist, VscSymbolEnum } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import Members from './Members';
import Progress from './Progress';

const Project = ({
  _id,
  projectName,
  description,
  confirmedMembers,
  taskColumns,
  createdAt,
}: any) => {
  const [progress, setProgress] = useState('');
  const [members, setMembers] = useState([]);

  const createdAtDate = new Date(createdAt).toLocaleString();

  useEffect(() => {
    // const taskColumnsClone = [...taskColumns];
    // const sortedTaskColumns = taskColumnsClone.sort(
    //   (a, b) => a.sequence - b.sequence
    // );
    // if (sortedTaskColumns.length >= 2) {
    //   let totalTask = 0;
    //   sortedTaskColumns.map((col) => {
    //     totalTask = totalTask + col.tasks.length;
    //     return null;
    //   });
    //   setProgress(
    //     (
    //       (sortedTaskColumns[sortedTaskColumns.length - 1].tasks.length /
    //         totalTask) *
    //       100
    //     ).toFixed(0)
    //   );
    // }
    if (confirmedMembers.length > 5) {
      setMembers(confirmedMembers.filter((m: any, i: any) => i <= 4));
    } else {
      setMembers(confirmedMembers);
    }
    console.log(projectName);
  }, [confirmedMembers, taskColumns]);

  return (
    <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-6 shadow-md">
      <div className="flex relative items-center justify-end">
        <AiOutlineMore className="flex absolute -top-5 p-1" size={30} />
      </div>

      <div className="mt-2">
        <p className="text-xl font-semibold my-2">{projectName}</p>
        <div className="flex flex-col text-gray-400 text-xs mb-2">
          <p>{createdAtDate}</p>
        </div>

        <div className="border-t-2 "></div>

        <div className="flex justify-between">
          <Members members={members} />
          {progress && <Progress progress={progress} />}
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-1">
        <Link className="" to={`/tasks/${_id}`}>
          <VscChecklist size={20} />
        </Link>
        <Link className="" to={`/notes/${_id}`}>
          <VscSymbolEnum size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Project;
