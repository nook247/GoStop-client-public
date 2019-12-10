import { Icon } from 'native-base';
import React from 'react';
import { Button, Text, StyleSheet, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Characterinfo from '../components/characterinfo';
import Habits from '../components/habits';
import combineReducers from '../reducers/index';

export default class HabitScreen extends React.Component <any, any> {
// class Habitscreen extends React.Component <any, any> {
  // static navigationOptions = {
  //   tabBarIcon: () => (
  //       <Icon name='ios-home' style={{ color: 'black' }} />
  //   ),
  // };
  public render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>

        <View style = { { flex : 1 } }>
          <Button
          title='Add habits'
          onPress={() => navigate('AddHabitsScreen')}
          />
        </View>

      <View style = {{ flex : 9 }}>
        <Habits/>
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
//   Habitscreen: { screen: Habitscreen },
//   AddHabitsScreen : { screen : AddHabitsScreen },
// });
// const HabitScreen = createAppContainer(MainNavigator);
// export default HabitScreen;

