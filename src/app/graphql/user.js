import { gql } from '@apollo/client';

export const AUTH_LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      photoURL
      createdAt
      token
    }
  }
`;

export const AUTH_REGISTER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      username
      email
      photoURL
      description
      createdAt
    }
  }
`;
