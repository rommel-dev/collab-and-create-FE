import { gql } from '@apollo/client';

export const MY_INFO = gql`
  query myInfo {
    myInfo {
      _id
      name
      email
      photo
      skills
      portfolio
      createdAt
      updatedAt
    }
  }
`;
