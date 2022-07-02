import { gql, useSubscription } from '@apollo/client';
import { GET_TASK_COLUMNS } from 'api/gql/task-column/task-column.query';
import { useUserStore } from 'state/user.store';

const MovedTaskColumnSubscription = () => {
  const { isAuth } = useUserStore();

  useSubscription(MOVE_TASK_COLUMN_SUBSCRIPTION, {
    variables: { userId: isAuth?._id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      // updating all task-columns of the project
      const data = client.readQuery({
        query: GET_TASK_COLUMNS,
        variables: {
          projectId: subscriptionData.data.movedTaskColumn.projectId,
        },
      });
      if (data) {
        client.writeQuery({
          query: GET_TASK_COLUMNS,
          variables: {
            projectId: subscriptionData.data.movedTaskColumn.projectId,
          },
          data: {
            getTaskColumns: [...subscriptionData.data.movedTaskColumn],
          },
        });
      }
    },
  });
  return null;
};

export const MOVE_TASK_COLUMN_SUBSCRIPTION = gql`
  subscription movedTaskColumn($userId: String!) {
    movedTaskColumn(userId: $userId) {
      _id
      columnName
      sequence
      projectId
      createdBy(populate: true) {
        _id
        name
        email
        photo
      }
      tasks(populate: true) {
        _id
        description
        createdBy(populate: true) {
          _id
          name
          email
          photo
        }
        inCharge(populate: true) {
          _id
          name
          email
          photo
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export default MovedTaskColumnSubscription;
