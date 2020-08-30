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

export const AUTH_GET_ME = gql`
  query getMe {
    getMe {
      id
      username
      email
      description
      photoURL
      createdAt
    }
  }
`;
