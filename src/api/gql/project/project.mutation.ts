import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation createProject(
    $projectName: String!
    $description: String
    $unconfirmedMembers: [String!]
    $techStacks: [String!]
  ) {
    createProject(
      input: {
        projectName: $projectName
        description: $description
        unconfirmedMembers: $unconfirmedMembers
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

export const INVITE_RESPONSE = gql`
  mutation inviteResponse($_id: String!, $inviteAction: String) {
    inviteResponse(input: { _id: $_id, inviteAction: $inviteAction }) {
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
