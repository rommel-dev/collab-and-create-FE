import AppRoutes from './routes/AppRoutes';
import NewTaskColumnSubscription from 'api/subscriptions/NewTaskColumnSubscription';
import ProjectInviteRespondedSubscription from 'api/subscriptions/ProjectInviteResponded';

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
