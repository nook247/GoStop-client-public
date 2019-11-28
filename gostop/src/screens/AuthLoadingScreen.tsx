import React from 'react';
import { AsyncStorage, ActivityIndicator, View, StatusBar } from 'react-native';

export default class AuthLoadingScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log('로딩중');
    console.log('userToken', userToken);
    this.props.navigation.navigate(userToken ? 'Habits' : 'Signin');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}