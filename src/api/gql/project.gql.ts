import { gql } from '@apollo/client';

export const PROJECTS_BY_USER = gql`
  query projectsByUser {
    projectsByUser {
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
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject(
    $projectName: String!
    $description: String
    $unconfirmMembers: [String!]
    $techStacks: [String!]
  ) {
    createProject(
      input: {
        projectName: $projectName
        description: $description
        unconfirmMembers: $unconfirmMembers
        techStacks: $techStacks
      }
    ) {
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
      createdAt
      updatedAt
      taskColumns {
        _id
        sequence
        tasks {
          _id
          createdBy {
            _id
          }
          inCharge {
            _id
          }
        }
      }
    }
  }
`;
