import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from 'api/gql/project/project.mutation';
import { GET_PROJECTS } from 'api/gql/project/project.query';
import { CREATE_TASK_COLUMN } from 'api/gql/task-column/task-column.mutation';
import ModalComponent from 'components/common/ModalComponent';
import NewProject from 'components/forms/NewProject';
import NewTaskColumn from 'components/forms/NewTaskColumn';
import { ISelectOption } from 'interfaces/common.interface';
import { useParams } from 'react-router-dom';
import { useFormStore } from 'state/form.store';
import BottomLeft from './BottomLeft';
import BottomRight from './BottomRight';

const BottomHeader = () => {
  const { projectId } = useParams();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const [openNewTaskColumnModal, setOpenNewTaskColumnModal] = useState(false);

  const {
    projectName,
    description,
    unconfirmedMembers,
    techStacks,
    columnName,
    resetForm,
  } = useFormStore();

  const handleCloseModal = () => {
    setOpenNewProjectModal(false);
    setOpenNewTaskColumnModal(false);
    resetForm();
  };

  const [confirmNewProject] = useMutation(CREATE_PROJECT, {
    onCompleted(data) {
      handleCloseModal();
    },
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: GET_PROJECTS,
      });
      if (data) {
        proxy.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: [...data.getProjects, result.data.createProject],
          },
        });
      }
    },
    variables: {
      projectName,
      description,
      unconfirmedMembers: unconfirmedMembers.map(
        (member: ISelectOption) => member.value
      ),
      techStacks: techStacks.map((stack: ISelectOption) => stack.value),
    },
  });

  const [confirmNewTaskColumn] = useMutation(CREATE_TASK_COLUMN, {
    onCompleted(data) {
      handleCloseModal();
    },
    //TODO: try removing update on cache after mutation, instead use subscription for update
    // update(proxy, result) {
    //   const data: any = proxy.readQuery({
    //     query: GET_TASK_COLUMNS,
    //     variables: { projectId },
    //   });
    //   if (data) {
    //     proxy.writeQuery({
    //       query: GET_TASK_COLUMNS,
    //       variables: { projectId },
    //       data: {
    //         getTaskColumns: [
    //           ...data.getTaskColumns,
    //           result.data.createTaskColumn,
    //         ],
    //       },
    //     });
    //   }
    // },
    variables: { columnName, projectId },
  });

  return (
    <div className="flex justify-between items-center">
      <BottomLeft />

      <BottomRight
        setOpenNewProjectModal={() => setOpenNewProjectModal(true)}
        setOpenNewTaskColumnModal={() => setOpenNewTaskColumnModal(true)}
      />

      <ModalComponent
        open={openNewProjectModal}
        onClose={handleCloseModal}
        cancel={handleCloseModal}
        modalTitle="New Project"
        confirmButtonText="Confirm"
        confirm={confirmNewProject}
      >
        <NewProject />
      </ModalComponent>

      <ModalComponent
        open={openNewTaskColumnModal}
        onClose={handleCloseModal}
        cancel={handleCloseModal}
        modalTitle="New Column"
        confirmButtonText="Confirm"
        confirm={confirmNewTaskColumn}
      >
        <NewTaskColumn />
      </ModalComponent>
    </div>
  );
};

export default BottomHeader;
