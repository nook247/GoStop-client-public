import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import AddHabitsScreen from './src/screens/addHabitsScreen';
import HabitScreen from './src/screens/HabitScreen';
import { createStore } from 'redux';
// import Redux from 'redux';
import reducer from './src/reducers/reducer';
import { Provider } from 'react-redux';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

interface userState {
  level : number;
  healthvalue : number;
  pointsvalue : number;
  coinsvalue : number;
}

 // 로그인이 되어 있으면 바로 habit 를 띄운다.
class HomeScreen extends Component<any, userState> {
  static navigationOptions = {
    title: 'Welcome',
  };
  public render() {
    console.log('appkey',this.props.navigation.state.key)
    console.log('home.this.props', this.props)
    const { navigate } = this.props.navigation;
    return (
      <Provider store = {store}>

      <View style = {styles.container}>
      <Button
      title= 'login ok'
      onPress={() => navigate('HabitScreen') }
      />
    </View>

    </Provider>
    );
  }
}

const store = createStore(reducer);

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  HabitScreen: { screen: HabitScreen },
  // AddHabitsScreen : { screen : AddHabitsScreen },
});
const App = createAppContainer(MainNavigator);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : '100%',
    backgroundColor: '#fff',
  },
});
