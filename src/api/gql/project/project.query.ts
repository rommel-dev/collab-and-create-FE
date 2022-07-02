import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
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
