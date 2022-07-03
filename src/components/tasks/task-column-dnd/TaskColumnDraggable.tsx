import { ITaskColumn } from 'interfaces/task-column.interface';
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import DraggableComponent from './DraggableComponent';
import { FaEllipsisV, FaPlus, FaFileMedical } from 'react-icons/fa';
import TaskDroppable from '../task-dnd/TaskDroppable';
// import ColumnMenu from './column-menu/ColumnMenu';

const TaskColumnDraggable = ({ taskColumns, getItemStyle, setOpen }: any) => {
  const [sortedTaskColumns, setSortedTaskColumns] = useState<any>([]);

  const sort = () => [...taskColumns].sort((a: any, b: any) => a.sequence - b.sequence);

  useEffect(() => {
    // re-sorting task columns after receiving subscription data from moved task column
    // setSortedTaskColumns(sort());
    console.log('Re-rendering task-columns');
  }, [taskColumns]);

  return taskColumns.map((tc: ITaskColumn, ind: number) => (
    <Draggable key={tc._id} draggableId={tc._id} index={ind}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-gray-300 rounded-md p-2 flex flex-col max-h-[85%] min-w-[30%]`}
          style={{ ...provided.draggableProps.style }}
        >
          <div className="flex flex-row justify-between items-center mb-2" {...provided.dragHandleProps}>
            {tc.columnName}
            <div className="flex items-center gap-1">
              <FaFileMedical size={15} onClick={() => setOpen(tc._id)} className="cursor-pointer" />
              {/* <ColumnMenu columnName={el.columnName} columnId={el._id} /> */}
            </div>
          </div>
          <TaskDroppable el={tc} />
        </div>
      )}
    </Draggable>
  ));
};

export default TaskColumnDraggable;
