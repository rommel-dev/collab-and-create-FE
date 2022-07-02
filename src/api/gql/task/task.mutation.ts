import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask(
    $description: String!
    $inCharge: [String!]
    $taskColumnId: String
  ) {
    createTask(
      input: {
        description: $description
        inCharge: $inCharge
        taskColumnId: $taskColumnId
      }
    ) {
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
  }
`;
