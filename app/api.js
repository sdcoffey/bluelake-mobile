import gql from 'graphql-tag';
import ApolloClient from "apollo-boost";

const create_user_mutation = gql`
mutation Login($phoneNumber: String!) {
  login(phoneNumber: $phoneNumber) {
    userPublicId
  }
}
`;

const confirm_user_mutation = gql`
mutation Confirm($user_id: String!, $code: String!) {
  confirm_user(user_id: $user_id, code: $code) {
    jwt
  }
}
`

export default class BluelakeClient {

  constructor() {
    this.client = new ApolloClient({
      uri: "http://192.168.99.100:31855/v1/graphql"
    });
  }

  async login(phoneNumber) {
    let response = await this.client.mutate({
      mutation: create_user_mutation,
      variables: {
        phoneNumber: phoneNumber
      }
    });

    return response.data.login.userPublicId;
  }

  async confirmUser(userId, code) {
    let response = await this.client.mutate({
      mutation: confirm_user_mutation,
      variables: {
        user_id: userId,
        code: code
      }
    });

    return response.data.confirm_user.jwt;
  }
}
