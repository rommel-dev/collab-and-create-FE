import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASK_COLUMNS } from 'api/gql/task-column/task-column.query';
import { CREATE_TASK } from 'api/gql/task/task.mutation';
import ModalComponent from 'components/common/ModalComponent';
import NewTask from 'components/forms/NewTask';
import DragAndDrop from 'components/tasks/DragAndDrop';
import { ISelectOption } from 'interfaces/common.interface';
import { ITaskColumn } from 'interfaces/task-column.interface';
import { useFormStore } from 'state/form.store';
import { move, reorder } from 'utils/dnd.utils';

const Tasks = () => {
  const { projectId } = useParams();
  const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false);

  const { description, inCharge, columnId, updateForm, resetForm } =
    useFormStore();

  const { data } = useQuery(GET_TASK_COLUMNS, {
    onCompleted(data) {},
    variables: { projectId },
  });

  const handleCloseModal = () => {
    setOpenNewTaskModal(false);
    resetForm();
  };

  const [newTask] = useMutation(CREATE_TASK, {
    update(proxy: any, result: any) {
      const data = proxy.readQuery({
        query: GET_TASK_COLUMNS,
        variables: { projectId },
      });
      if (data) {
        const newData = data.getTaskColumns.map((col: ITaskColumn) => {
          if (col._id === columnId) {
            return {
              ...col,
              tasks: [...col.tasks, result.data.createTask],
            };
          } else {
            return { ...col };
          }
        });
        proxy.writeQuery({
          query: GET_TASK_COLUMNS,
          data: {
            getTaskColumns: [...newData],
          },
        });
        handleCloseModal();
      }
    },
    variables: {
      description,
      taskColumnId: columnId,
      inCharge: inCharge.map((item: ISelectOption) => item.value),
    },
  });

  function onDragEnd(result: any) {
    const { getTaskColumns } = data;
    const { source, destination, draggableId, type } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(getTaskColumns);
      const target = newColumnOrder[source.index];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, target);
      const taskColumnIds = (newColumnOrder as ITaskColumn[]).map(
        (col: ITaskColumn) => col._id
      );
      // moveTaskColumn({ variables: { taskColumnIds, projectId } });
      return;
    }

    const sId = source.droppableId;
    const dId = destination.droppableId;

    if (sId === dId) {
      const tasks = reorder(
        (getTaskColumns || []).find((c: ITaskColumn) => c._id === sId).tasks,
        source.index,
        destination.index
      );
      const newTaskColumns = [...getTaskColumns];
      newTaskColumns[newTaskColumns.findIndex((c) => c._id === sId)] = {
        ...newTaskColumns[newTaskColumns.findIndex((c) => c._id === sId)],
        tasks,
      };
    } else {
      const result = move(
        getTaskColumns.find((c: ITaskColumn) => c._id === sId),
        getTaskColumns.find((c: ITaskColumn) => c._id === dId),
        source,
        destination
      );
      const newTaskColumns = [...data.gettaskColumns];
      newTaskColumns[newTaskColumns.findIndex((c) => c._id === sId)] =
        result[sId];
      newTaskColumns[newTaskColumns.findIndex((c) => c._id === dId)] =
        result[dId];
      // moveTask({
      //   variables: {
      //     sourceColumnId: sId,
      //     destinationColumnId: dId,
      //     taskId: draggableId,
      //     projectId,
      //   },
      // });
    }
  }

  const onOpenNewTaskModal = (columnId: string) => {
    setOpenNewTaskModal(true);
    updateForm({ columnId: columnId });
  };

  return (
    <main className="p-3 flex flex-1 h-full">
      <ModalComponent
        open={openNewTaskModal}
        onClose={handleCloseModal}
        cancel={handleCloseModal}
        modalTitle="New Task"
        confirmButtonText="Confirm"
        confirm={newTask}
      >
        <NewTask />
      </ModalComponent>

      {data?.getTaskColumns.length > 0 ? (
        <DragAndDrop
          onDragEnd={onDragEnd}
          taskColumns={data.getTaskColumns}
          onOpenNewTaskModal={onOpenNewTaskModal}
          mainDropprableId={projectId}
        />
      ) : (
        <h3>No category added</h3>
      )}
    </main>
  );
};

export default Tasks;
