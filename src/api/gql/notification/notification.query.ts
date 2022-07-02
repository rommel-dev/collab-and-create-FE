import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query getNotifications {
    getNotifications {
      _id
      project(populate: true) {
        _id
        projectName
        description
        createdBy(populate: true) {
          _id
          name
          email
          photo
        }
      }
      task(populate: true) {
        _id
        description
        createdBy(populate: true) {
          _id
          name
          email
          photo
        }
      }
      createdAt
      updatedAt
    }
  }
`;
