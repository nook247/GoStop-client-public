import React from 'react';
import { AsyncStorage, ActivityIndicator, View, StatusBar } from 'react-native';

export default class AuthLoadingScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');
    console.log('로딩중');

    this.props.navigation.navigate(userToken ? 'Habits' : 'Signin');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
