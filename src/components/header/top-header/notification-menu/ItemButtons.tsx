import { useMutation } from '@apollo/client';
import { INVITE_RESPONSE } from 'api/gql/project/project.mutation';

import { GET_PROJECTS } from 'api/gql/project/project.query';
import { IProject } from 'interfaces/project.interface';
import React from 'react';
import { useFormStore } from 'state/form.store';

const ItemButtons = ({ projectId }: any) => {
  const { loading, updateForm } = useFormStore();

  const [acceptProjectInvite] = useMutation(INVITE_RESPONSE, {
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: GET_PROJECTS,
      });
      if (data) {
        const newData = [
          ...data.getProjects.filter(
            (p: IProject) => p._id !== result.data.inviteResponse._id
          ),
          result.data.inviteResponse,
        ];
        proxy.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: [...newData],
          },
        });
        updateForm({ loading: false });
      }
    },
    variables: {
      _id: projectId,
      inviteAction: 'accept',
    },
  });

  const [rejectProjectInvite] = useMutation(INVITE_RESPONSE, {
    update(proxy, result) {
      //   dispatch({
      //     type: 'REJECT_PROJECT_INVITE',
      //     payload: { project: result.data.rejectProjectInvite },
      //   });
    },
    variables: {
      _id: projectId,
      inviteAction: 'reject',
    },
  });

  return (
    <div className="flex gap-1 mt-3">
      <button
        onClick={() => {
          updateForm({ loading: true });
          acceptProjectInvite();
        }}
        className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
      >
        <p className="text-gray-100">Accept</p>
      </button>
      <button
        onClick={() => rejectProjectInvite()}
        className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
      >
        <p className="text-gray-100">Reject</p>
      </button>
      <button
        onClick={() => console.log('NO')}
        className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
      >
        <p className="text-gray-100">Details</p>
      </button>
    </div>
  );
};

export default ItemButtons;
