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
    let response = await this.client.mutate({
      mutation: LoginUserMutation,
      variables: {
        phoneNumber: phoneNumber
      }
    });

    return response.data.login;
  }

  async confirmUser(publicId, authCode) {
    let response = await this.client.mutate({
      mutation: ConfirmUserMutation,
      variables: {
        publicId: publicId,
        authCode: authCode
      }
    });

    return response.data.confirmUser;
  }
}
