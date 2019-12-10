import React from 'react';
import { AsyncStorage, ActivityIndicator, View, StatusBar } from 'react-native';
import { getuser } from '../actions/getuseraction';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component<any, any> {
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
    // if (userToken){
    //   const id = await AsyncStorage.getItem('id');
    //   const email = await AsyncStorage.getItem('email');
    //   const name = await AsyncStorage.getItem('name');
    //   const userCode = await AsyncStorage.getItem('userCode');
    //   const level = await AsyncStorage.getItem('level');
    //   const health = await AsyncStorage.getItem('health');
    //   const point = await AsyncStorage.getItem('point');
    //   const coin = await AsyncStorage.getItem('coin');
    //   this.props.getuser(id, email, name, userCode, level, health, point, coin);
    // }
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

const mapDispatchToProps = dispatch => {
  return {
    getuser : (id, email, name, userCode, level, health, point, coin) => {
      dispatch(getuser(id, email, name, userCode, level, health, point, coin))
    },
  };
};

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);