import { useMutation } from '@apollo/client';
import { INVITE_RESPONSE } from 'api/gql/project/project.mutation';

const ItemButtons = ({ projectId }: any) => {
  const [acceptProjectInvite] = useMutation(INVITE_RESPONSE, {
    variables: {
      _id: projectId,
      inviteAction: 'accept',
    },
  });

  const [rejectProjectInvite] = useMutation(INVITE_RESPONSE, {
    variables: {
      _id: projectId,
      inviteAction: 'reject',
    },
  });

  return (
    <div className="flex gap-1 mt-3">
      <button
        onClick={() => {
          // updateForm({ loading: true });
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
