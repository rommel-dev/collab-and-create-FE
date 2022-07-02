import { gql } from '@apollo/client';

export const CREATE_TASK_COLUMN = gql`
  mutation createTaskColumn($columnName: String!, $projectId: String) {
    createTaskColumn(
      input: { columnName: $columnName, projectId: $projectId }
    ) {
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

export const MOVE_TASK_COLUMN = gql`
  mutation moveTaskColumn($_ids: [String!]!, $projectId: String!) {
    moveTaskColumn(input: { _ids: $_ids, projectId: $projectId }) {
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
