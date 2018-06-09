'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	TextInput,
  Text
} from 'react-native';

import BluelakeClient from '../network/graphql';
import { userJwt } from '../fs/userStorage';

export default class Onboarding extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      prompt: 'Enter your phone number!',
      phoneNumber: '',
    };
  }

  render() {
    return (
      <View style={styles.background}>
        <Text>{this.state.prompt}</Text>
        <TextInput onChangeText={(text) => this.setState({text: text})}
          autoFocus={true}
          keyboardType={'phone-pad'}
          returnKeyType={'done'}
          value={this.state.text}
          onEndEditing={this.onSubmit.bind(this)}
      />
      </View>
    );
  }

  async onSubmit() {
    let client = new BluelakeClient();

    if (this.state.userId) {
      let jwt = await client.confirmUser(this.state.userId, this.state.text);
      userJwt(jwt);
    } else {
      let userId = await client.login(this.state.text);
      this.setState({
        userId: userId,
        prompt: 'Enter your authCode',
      });
    }
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#abcdef',
    flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
  }
});
