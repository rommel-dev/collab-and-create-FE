import { gql, useSubscription } from '@apollo/client';
import { useUserStore } from 'state/user.store';

const ProjectInviteRespondedSubscription = () => {
  const { isAuth } = useUserStore();

  useSubscription(PROJECT_INVITE_RESPONDED, {
    variables: { userId: isAuth?._id },
  });
  return null;
};

export const PROJECT_INVITE_RESPONDED = gql`
  subscription projectInviteResponded($userId: String!) {
    projectInviteResponded(userId: $userId) {
      _id
      projectName
      description
      status
      techStacks
      createdBy(populate: true) {
        _id
        name
        email
        photo
      }
      confirmedMembers(populate: true) {
        _id
        name
        email
        photo
      }
      unconfirmedMembers(populate: true) {
        _id
        name
        email
        photo
      }
      createdAt
      updatedAt
    }
  }
`;

export default ProjectInviteRespondedSubscription;
