import { gql } from "@apollo/client";

import { PHOTO_FRAGMENT } from "../fragments";

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowers
      totalFollowing
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

export const UNFOLLOW_USER_MUTATION = gql`
  mutation ubfollowUser($username: String!) {
    ubfollowUser(username: $username) {
      ok
    }
  }
`;
