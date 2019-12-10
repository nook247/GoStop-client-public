import { Button, Container, Header, Icon, Left, Right, Text } from 'native-base';
import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Characterinfo from '../components/characterinfo';
import combineReducers from '../reducers/index';
import HabitScreen from '../screens/HabitScreen';
import rewardScreen from '../screens/RewardScreen';
import TodosScreen from '../screens/TodosScreen';
import ItemshopScreen from './ItemshopScreen';
import CharacterchangeScreen from './CharacterchangeScreen';
import RewardScreen from './RewardScreen';

interface UserState {
  level : number;
  healthvalue : number;
  pointsvalue : number;
  coinsvalue : number;
}

 // 로그인이 되어 있으면 바로 habit 를 띄운다.
class Homescreen extends Component<any, UserState> {
  // public static navigationOptions = {
  //   title: 'Welcome',
  // };
  public render() {
    // const { navigate } = this.props.navigation;
    return (
      
    //  <Provider store = {store}>
         <Container>
        <Header>
          <Left style={{ flexDirection: 'row' }}>
           <Icon onPress={() => this.props.navigation.openDrawer()} name='md-menu' style={{ color: 'white', marginRight: 15 }} />
          </Left>
          <Right>
           <Icon name='md-cart' style={{ color: 'white' }} />
          </Right>
        </Header>
        <Characterinfo style = {{ flex : 1 }}/>
        <AppTabContainet style = {{ flex : 5 }}/>
       </Container>

    // </Provider>
    );
  }
}

const store = createStore(combineReducers);

const appTabNavigator = createMaterialTopTabNavigator({
  Habit : { screen : HabitScreen },
  Todos : { screen : TodosScreen },
  Reward : { screen : RewardScreen },
},                                                    {
  animationEnabled: true,
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      ...Platform.select({
        ios:{
          backgroundColor:'white',
        },
      }),
    },
    iconStyle: { height: 15 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: true,
    showIcon: true,
  },
});
const AppTabContainet = createAppContainer(appTabNavigator);

const mainNavigator = createStackNavigator({
  Homescreen: { screen: Homescreen },
  Characterinfo : { screen : Characterinfo },
  AppTabContainet : { screen : AppTabContainet },
  HabitScreen: { screen: HabitScreen },
  TodosScreen : { screen : TodosScreen },
  RewardScreen : { screen : rewardScreen },
  ItemshopScreen : { screen : ItemshopScreen },
  CharacterchangeScreen : { screen : CharacterchangeScreen },
});

const myDrawerNavigator = createDrawerNavigator({
  mainNavigator : { screen : mainNavigator },
  ItemshopScreen : { screen : ItemshopScreen },
  CharacterchangeScreen : { screen : CharacterchangeScreen },
});

const HomeScreen = createAppContainer(myDrawerNavigator);
export default HomeScreen;
