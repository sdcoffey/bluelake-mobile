import gql from 'graphql-tag';
import ApolloClient from "apollo-boost";

const create_user_mutation = gql`
mutation Login($phone: String!) {
  login(phone: $phone) {
    id
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
      uri: "http://localhost:3000/v1/graphql"
    });
  }

  async login(phoneNumber) {
    let response = await this.client.mutate({
      mutation: create_user_mutation,
      variables: {
        phone: phoneNumber
      }
    });

    return response.data.login.id;
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
