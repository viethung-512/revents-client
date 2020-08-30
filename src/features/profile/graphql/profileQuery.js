import { gql } from '@apollo/client';

export const PROFILE_GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      username
      photoURL
      email
      followerCount
      followingCount
      description
      createdAt
      followers {
        id
      }
    }
  }
`;

export const PROFILE_GET_PHOTOS = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      photoURL
      photos {
        id
        url
      }
    }
  }
`;

export const PROFILE_GET_FOLLOWERS = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      followers {
        id
        username
        photoURL
      }
    }
  }
`;

export const PROFILE_GET_FOLLOWINGS = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      followings {
        id
        username
        photoURL
      }
    }
  }
`;
