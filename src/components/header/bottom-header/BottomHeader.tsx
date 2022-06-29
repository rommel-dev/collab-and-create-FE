import { useMutation } from '@apollo/client';
import { CREATE_PROJECT, PROJECTS_BY_USER } from 'api/gql/project.gql';
import ModalComponent from 'components/common/ModalComponent';
import NewProject from 'components/forms/NewProject';
import { ISelectOption } from 'interfaces/common.interface';
import React, { useState } from 'react';
import { useFormStore } from 'state/form.store';
import BottomLeft from './BottomLeft';
import BottomRight from './BottomRight';

const BottomHeader = () => {
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);

  const { projectName, description, unconfirmMembers, techStacks, resetForm } =
    useFormStore();

  const handleCloseModal = () => {
    setOpenNewProjectModal(false);
    resetForm();
  };

  const [confirmNewProject] = useMutation(CREATE_PROJECT, {
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: PROJECTS_BY_USER,
      });
      if (data) {
        proxy.writeQuery({
          query: PROJECTS_BY_USER,
          data: {
            projectsByUser: [...data.projectsByUser, result.data.createProject],
          },
        });
        handleCloseModal();
      }
    },
    variables: {
      projectName,
      description,
      unconfirmMembers: unconfirmMembers.map(
        (member: ISelectOption) => member.value
      ),
      techStacks: techStacks.map((stack: ISelectOption) => stack.value),
    },
  });

  return (
    <div className="flex justify-between items-center">
      <BottomLeft />

      <BottomRight
        setOpenNewProjectModal={() => setOpenNewProjectModal(true)}
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
    </div>
  );
};

export default BottomHeader;
