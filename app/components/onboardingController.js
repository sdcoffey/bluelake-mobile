'use strict';

import React, { Component } from 'react';
import {
  Button,
	StyleSheet,
	View,
  Text
} from 'react-native';
import Navigator from 'native-navigation';

export default class Onboarding extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.headerText}>Welcome to Bluelake</Text>
        <Button
          title="Get Going"
          onPress={this.onSubmit.bind(this)}
      />
      </View>
    );
  }

  async onSubmit() {
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 80
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24
  }
});
