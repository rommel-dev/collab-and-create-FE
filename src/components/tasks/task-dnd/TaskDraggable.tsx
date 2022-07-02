import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskDraggable = ({ tasks, columnId }: any) => {
  return tasks?.map((task: any, index: number) => {
    return (
      <Draggable key={task._id} draggableId={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
          >
            <TaskCard
              columnId={columnId}
              taskId={task._id}
              description={task.description}
              photo={task.createdBy.photo}
              inCharge={task.inCharge}
              createdAt={task.createdAt}
              isDragging={snapshot.isDragging}
              draggableStyle={provided.draggableProps.style}
            />
            {/* {location.pathname.split('/')[2] === "personaltasks" ? 
                <PersonalTask
                  columnId={columnId}
                    taskId={task._id}
                    description={task.description}
                    createdAt={task.createdAt}
                    isDragging={snapshot.isDragging}
                    draggableStyle={provided.draggableProps.style}
                /> :
                <ProjectTask
                   columnId={columnId}
                    taskId={task._id}
                    description={task.description}
                    photo={task.createdBy.photo}
                    inCharge={task.inCharge}
                    createdAt={task.createdAt}
                    isDragging={snapshot.isDragging}
                    draggableStyle={provided.draggableProps.style}
                />} */}
          </div>
        )}
      </Draggable>
    );
  });
};

export default TaskDraggable;
