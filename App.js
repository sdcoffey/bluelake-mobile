import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import { userJwt } from './app/fs/userStorage';
import OnboardingController from './app/components/onboardingController';
import BluelakeMainController from './app/components/bluelakeMainController';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      loading: true,
      jwt: null
    };
  }

  async componentDidMount() {
    let jwt = await userJwt();
    this.setState({
      jwt: jwt,
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.mainTheme}>
        </View>
      );
    } else {
      if (this.state.jwt) {
        return (
          <BluelakeMainController />
        )
      } else {
        return (
          <OnboardingController />
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  mainTheme:{
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});

