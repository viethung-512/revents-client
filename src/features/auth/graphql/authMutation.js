import { gql } from '@apollo/client';

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
      token
    }
  }
`;

export const AUTH_UPDATE_USER = gql`
  mutation updateUser($username: String, $description: String) {
    updateUser(username: $username, description: $description) {
      username
      description
    }
  }
`;

export const AUTH_UPDATE_PASSWORD = gql`
  mutation updateUser($password: String!) {
    updateUser(password: $password) {
      id
    }
  }
`;
