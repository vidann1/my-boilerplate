import { gql } from "apollo-boost";

export const changePasswordMutation = gql`
  mutation changePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;
