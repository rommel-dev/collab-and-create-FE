import { useMutation } from '@apollo/client';
import { MOVE_TASK_COLUMN } from 'api/gql/task-column/task-column.mutation';
import { GET_TASK_COLUMNS } from 'api/gql/task-column/task-column.query';
import { client } from 'index';
import { ITaskColumn } from 'interfaces/task-column.interface';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getItemStyle } from 'utils/dnd.utils';
import TaskColumnDraggable from './TaskColumnDraggable';

const TaskColumnDroppable = ({ taskColumns, onOpenNewTaskModal, mainDropprableId }: any) => {
  const [moveTaskColumn] = useMutation(MOVE_TASK_COLUMN);

  // a little function to help us with reordering the result
  const reorder = (list: any, startIndex: number, endIndex: number, type: string, columnId?: string) => {
    console.log('TYPE', type);
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    if (type === 'column') {
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
    } else {
      console.log('NEW ORDER', result);

      const newTaskColumns = taskColumns.map((tc: any) => {
        if (tc._id === columnId) {
          return { ...tc, tasks: [...result] };
        } else {
          return { ...tc };
        }
      });
      client.writeQuery({
        query: GET_TASK_COLUMNS,
        variables: {
          projectId: mainDropprableId,
        },
        data: {
          getTaskColumns: [...newTaskColumns],
        },
      });
    }
  };

  const move = (source: ITaskColumn, destination: ITaskColumn, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source.tasks);
    const destClone = Array.from(destination.tasks);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    source = { ...source, tasks: sourceClone };
    destination = { ...destination, tasks: destClone };
    const result: any = {};
    result[droppableSource.droppableId] = source;
    result[droppableDestination.droppableId] = destination;

    const newTaskColumns = taskColumns.map((tc: any) => {
      if (result[tc._id]) {
        return { ...result[tc._id] };
      } else {
        return { ...tc };
      }
    });
    client.writeQuery({
      query: GET_TASK_COLUMNS,
      variables: {
        projectId: mainDropprableId,
      },
      data: {
        getTaskColumns: [...newTaskColumns],
      },
    });
    //TODO: persist new TaskColumn with mutation
    // return result;
  };

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;
    // dropped outside the list
    if (!destination) return;

    if (type === 'column') {
      reorder(taskColumns, result.source.index, result.destination.index, type);
      return;
    }

    const sId = source.droppableId;
    const dId = destination.droppableId;

    if (sId === dId) {
      const tasks = reorder(taskColumns.find((c: any) => c._id === sId).tasks, source.index, destination.index, type, sId);
      const newTaskColumns = [...taskColumns];
      newTaskColumns[newTaskColumns.findIndex((c) => c._id === sId)] = {
        ...newTaskColumns[newTaskColumns.findIndex((c) => c._id === sId)],
        tasks,
      };
    } else {
      move(
        taskColumns.find((c: any) => c._id === sId),
        taskColumns.find((c: any) => c._id === dId),
        source,
        destination
      );
      // const newTaskColumns = [...taskColumns];
      // newTaskColumns[newTaskColumns.findIndex((c) => c._id === sId)] = result[sId];
      // newTaskColumns[newTaskColumns.findIndex((c) => c._id === dId)] = result[dId];
      // moveTask({ variables: { sourceColumnId: sId, destinationColumnId: dId, taskId: draggableId, projectId } })
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={mainDropprableId} direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            className={`${taskColumns.length > 4 ? 'overflow-auto' : ''} ${snapshot.isDraggingOver ? 'bg-blue-200' : ''} flex w-full max-h-screen flex-row gap-2`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <TaskColumnDraggable setOpen={onOpenNewTaskModal} getItemStyle={getItemStyle} taskColumns={taskColumns} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskColumnDroppable;
