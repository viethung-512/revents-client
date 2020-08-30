import { gql } from '@apollo/client';

export const PROFILE_UPLOAD_IMAGE = gql`
  mutation uploadProfileImage($image: Upload!) {
    uploadProfileImage(image: $image) {
      photoURL
      photos {
        id
        url
      }
    }
  }
`;

export const PROFILE_SET_MAIN_PHOTO = gql`
  mutation setMainPhoto($photo: String!) {
    setMainPhoto(photo: $photo) {
      photoURL
    }
  }
`;

export const PROFILE_DELETE_PHOTO = gql`
  mutation deletePhoto($photo: String!) {
    deletePhoto(photo: $photo) {
      photos {
        id
        url
      }
    }
  }
`;

export const PROFILE_TOGGLE_FOLLOW = gql`
  mutation toggleFollowUser($userId: String!) {
    toggleFollowUser(userId: $userId) {
      followerCount
      followingCount
      followers {
        id
        username
        photoURL
      }
      followings {
        id
        username
        photoURL
      }
    }
  }
`;
