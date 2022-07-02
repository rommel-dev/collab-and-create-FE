import { Droppable } from 'react-beautiful-dnd';
import { getItemStyle } from 'utils/dnd.utils';
import TaskDraggable from './TaskDraggable';

const TaskDroppable = ({ el }: any) => {
  return (
    <Droppable droppableId={el._id} type="task">
      {(provided, snapshot) => {
        return (
          <div
            className={`${
              snapshot.isDraggingOver ? 'bg-blue-200' : 'bg-gray-100'
            } rounded-md p-1 flex-1 overflow-auto no-scrollbar`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ul className="space-y-2 flex-1">
              <TaskDraggable
                tasks={el.tasks}
                getItemStyle={getItemStyle}
                columnId={el._id}
              />
            </ul>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default TaskDroppable;
