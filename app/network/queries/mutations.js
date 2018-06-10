import gql from 'graphql-tag';

export const LoginUserMutation = gql`
mutation Login($phoneNumber: String!) {
  login(phoneNumber: $phoneNumber) {
    userPublicId
  }
}`;

export const ConfirmUserMutation = gql`
mutation Confirm($publicId: String!, $authCode: String!) {
  confirmUser(publicId: $publicId, authCode: $authCode) {
    userJwt
  }
}`;
