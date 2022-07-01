import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password })
  }
`;

export const SIGN_UP = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(input: { name: $name, email: $email, password: $password }) {
      _id
      email
      name
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!, $code: String, $password: String) {
    forgotPassword(input: { email: $email, code: $code, password: $password })
  }
`;
