import { gql, useQuery, useSubscription } from '@apollo/client';
import { GET_NOTIFICATIONS } from 'api/gql/notification/notification.query';
import { GET_TASK_COLUMNS } from 'api/gql/task-column/task-column.query';
import NewTaskColumnSubscription from 'api/subscriptions/NewTaskColumnSubscription';
import ProjectInviteRespondedSubscription from 'api/subscriptions/ProjectInviteResponded';
import { useEffect } from 'react';
import { useUserStore } from 'state/user.store';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <ProjectInviteRespondedSubscription />
      <NewTaskColumnSubscription />
      <AppRoutes />
    </>
  );
};

export default App;
