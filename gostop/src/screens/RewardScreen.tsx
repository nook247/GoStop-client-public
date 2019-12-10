import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Characterinfo from '../components/characterinfo';
import Rewards from '../components/rewards';
import combineReducers from '../reducers/index';
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import AddRewardScreen from './addRewardScreen';

export default class RewardScreen extends React.Component <any, any> {
// class Rewardscreen extends React.Component <any, any> {
  // static navigationOptions = {
  //   tabBarIcon: ({ tintColor }) => (
  //       <Icon name='ios-home' style={{ color: tintColor }} />
  //   ),
  // };
  public render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>

        <View style = { { flex : 1 } }>
          <Button
          title='Add Rewards'
          onPress={() => navigate('AddRewardScreen')}
          />
        </View>

      <View style = {{ flex : 9 }}>
        <Rewards/>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    width : '100%',
  },
});

// const MainNavigator = createStackNavigator({
//   Rewardscreen: { screen: Rewardscreen },
//   AddRewardScreen : { screen : AddRewardScreen },
// });
// const RewardScreen = createAppContainer(MainNavigator);
// export default RewardScreen;
