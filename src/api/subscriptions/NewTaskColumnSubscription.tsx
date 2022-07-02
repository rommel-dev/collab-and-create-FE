import { gql, useSubscription } from '@apollo/client';
import { GET_TASK_COLUMNS } from 'api/gql/task-column/task-column.query';
import { useUserStore } from 'state/user.store';

const NewTaskColumnSubscription = () => {
  const { isAuth } = useUserStore();

  useSubscription(NEW_TASK_COLUMN_SUBSCRIPTION, {
    variables: { userId: isAuth?._id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const data = client.readQuery({
        query: GET_TASK_COLUMNS,
        variables: {
          projectId: subscriptionData.data.createdTaskColumn.projectId,
        },
      });

      if (data) {
        client.writeQuery({
          query: GET_TASK_COLUMNS,
          variables: {
            projectId: subscriptionData.data.createdTaskColumn.projectId,
          },
          data: {
            getTaskColumns: [
              ...data.getTaskColumns,
              subscriptionData.data.createdTaskColumn,
            ],
          },
        });
      }
    },
  });
  return null;
};

export const NEW_TASK_COLUMN_SUBSCRIPTION = gql`
  subscription createdTaskColumn($userId: String!) {
    createdTaskColumn(userId: $userId) {
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

export default NewTaskColumnSubscription;
