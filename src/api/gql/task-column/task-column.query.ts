import { gql } from '@apollo/client';

export const GET_TASK_COLUMNS = gql`
  query getTaskColumns($projectId: String) {
    getTaskColumns(input: { projectId: $projectId }) {
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
