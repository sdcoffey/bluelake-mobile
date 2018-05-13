'use strict';

import { AsyncStorage } from 'react-native';

const JWT_KEY = 'user_jwt';

export async function userJwt(jwt) {
  if (jwt) {
    AsyncStorage.setItem(JWT_KEY, jwt);
  } else {
    return AsyncStorage.getItem(JWT_KEY);
  }
}
