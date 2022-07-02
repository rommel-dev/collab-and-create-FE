import { useMutation } from '@apollo/client';
import { MOVE_TASK_COLUMN } from 'api/gql/task-column/task-column.mutation';
import { GET_TASK_COLUMNS } from 'api/gql/task-column/task-column.query';
import { client } from 'index';
import { ITaskColumn } from 'interfaces/task-column.interface';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getItemStyle } from 'utils/dnd.utils';
import TaskColumnDraggable from './TaskColumnDraggable';

const TaskColumnDroppable = ({
  taskColumns,
  onOpenNewTaskModal,
  mainDropprableId,
}: any) => {
  const [moveTaskColumn] = useMutation(MOVE_TASK_COLUMN);

  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const newTaskColumns = result.map((tc: any, index: number) => {
      return { ...tc, sequence: index + 1 };
    });

    // optimistic update of UI
    client.writeQuery({
      query: GET_TASK_COLUMNS,
      variables: {
        projectId: mainDropprableId,
      },
      data: {
        getTaskColumns: [...newTaskColumns],
      },
    });

    // calling the mutation with variables as parameter
    moveTaskColumn({
      variables: {
        projectId: mainDropprableId,
        _ids: result.map((tc) => (tc as any)._id),
      },
    });
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) return;

    if (result.type === 'column') {
      reorder(taskColumns, result.source.index, result.destination.index);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={mainDropprableId}
        direction="horizontal"
        type="column"
      >
        {(provided, snapshot) => (
          <div
            className={`${taskColumns.length > 4 ? 'overflow-auto' : ''} ${
              snapshot.isDraggingOver ? 'bg-blue-200' : ''
            } flex w-full flex-row gap-2`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <TaskColumnDraggable
              setOpen={onOpenNewTaskModal}
              getItemStyle={getItemStyle}
              taskColumns={taskColumns}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskColumnDroppable;
