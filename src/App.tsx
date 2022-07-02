import AppRoutes from './routes/AppRoutes';
import NewTaskColumnSubscription from 'api/subscriptions/NewTaskColumnSubscription';
import ProjectInviteRespondedSubscription from 'api/subscriptions/ProjectInviteResponded';
import MovedTaskColumnSubscription from 'api/subscriptions/MovedTaskColumnSubscription';

const App = () => {
  return (
    <>
      <MovedTaskColumnSubscription />
      <ProjectInviteRespondedSubscription />
      <NewTaskColumnSubscription />

      <AppRoutes />
    </>
  );
};

export default App;
