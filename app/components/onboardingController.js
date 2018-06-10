'use strict';

import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
  Button,
  Keyboard,
	StyleSheet,
  Text,
  TextInput,
	View,
} from 'react-native';

import BluelakeClient from '../network/graphql';
import { userJwt } from '../fs/userStorage';

class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.background, {
        paddingTop: 80,
        paddingBottom: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
      }]}>
        <Text style={[styles.large, styles.bold]}>Welcome to Bluelake</Text>
        <Button
          title="Get Going"
          onPress={this.onSubmit.bind(this)}
      />
      </View>
    );
  }

  onSubmit() {
    this.props.navigation.navigate('Onboarding', {
      prompt: 'Your phone number',
      subtext: "We'll send a code to this phone number",
      onSubmit: async (phoneNumber) => {
        let client = new BluelakeClient();
        let loginResponse = await client.login(phoneNumber);
        let userPublicId = loginResponse.userPublicId;

        this.props.navigation.push('Onboarding', {
          prompt: 'Your auth code',
          subtext: "Enter the auth code we sent to your phone number",
          onSubmit: async (authCode) => {
            let response = await client.confirmUser(userPublicId, authCode);
            await userJwt(response.userJwt);
          }
        });
      }
    });
  }
}

class OnboardingScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    const prompt = this.props.navigation.getParam('prompt', '');
    const subtext = this.props.navigation.getParam('subtext', '');

    return (
      <View style={[styles.background, styles.padding]}>
        <View style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }} >
          <Button
            onPress={this.onSubmit.bind(this)}
            title="Next"
            enabled={false}
          />
        </View>
        <View style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          <TextInput
            ref={(_input) => { this.input = _input; }}
            autoFocus={true}
            caretHidden={true}
            editable={true}
            keyboardType={'phone-pad'}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder={prompt}
          />
          <Text
            style={styles.bold}
          >
          {subtext}
          </Text>
        </View>
      </View>
    );
  }

  async onSubmit() {
    Keyboard.dismiss();

    const onSubmit = this.props.navigation.getParam('onSubmit', () => {});

    onSubmit(this.state.text);
  }
}

export default createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Onboarding: OnboardingScreen,
  },
  {
    initialRouteName: 'Welcome',
    headerMode: 'none'
  }
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1
  },
  padding: {
    padding: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  large: {
    fontSize: 24
  },
  centered: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});
