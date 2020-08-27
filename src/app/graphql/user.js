import { gql } from '@apollo/client';

export const AUTH_LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
