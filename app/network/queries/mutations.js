import gql from 'graphql-tag';

export const LoginUserMutation = gql`
mutation Login($phoneNumber: String!) {
  login(phoneNumber: $phoneNumber) {
    userPublicId
  }
}`;

export const ConfirmUserMutation = gql`
mutation Confirm($user_id: String!, $code: String!) {
  confirm_user(user_id: $user_id, code: $code) {
    jwt
  }
}`;
