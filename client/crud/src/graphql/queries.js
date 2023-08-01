import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query getCurrentLoggedInUser {
    getCurrentLoggedInUser {
      id
      firstName
      lastName
      email
    }
  }
`;
export const GET_TOKEN = gql`
  query getUserToken($email: String!, $password: String!) {
    getUserToken(email: $email, password: $password)
  }
`;
