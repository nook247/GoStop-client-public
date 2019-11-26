import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Signin from '../components/Signin';

export default class SigninScreen extends Component {
  public render() {
    return (
            <View>
                <Text>Go?! Stop?!</Text>
                <Signin/>
            </View>
    );
  }
}
