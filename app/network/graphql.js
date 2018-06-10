import ApolloClient from "apollo-boost";
import ENV from '../environment';

import { LoginUserMutation,
  ConfirmUserMutation
}from './queries/mutations';

export default class BluelakeClient {

  constructor() {
    this.client = new ApolloClient({
      uri: `${ENV.BASE_URL}/v1/graphql`
    });
  }

  async login(phoneNumber) {
    console.log('logging in');

    let response = await this.client.mutate({
      mutation: LoginUserMutation,
      variables: {
        phoneNumber: phoneNumber
      }
    });

    return response.data.login.userPublicId;
  }

  async confirmUser(userId, code) {
    let response = await this.client.mutate({
      mutation: ConfirmUserMutation,
      variables: {
        user_id: userId,
        code: code
      }
    });

    return response.data.confirm_user.jwt;
  }
}
