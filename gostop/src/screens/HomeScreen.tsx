import React, { Component } from 'react';
import { Platform, View, TouchableOpacity, Button, Text, Image, StyleSheet } from 'react-native';
import { createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, SafeAreaView, DrawerItems, ScrollView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DrawerContainer from '../components/Drawer';
import ItemshopScreen from './ItemshopScreen';
import CharacterchangeScreen from './CharacterchangeScreen';;
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import AuthLoadingScreen from './AuthLoadingScreen';

import Habits from '../components/habits';
import Todos from '../components/todos';
import Rewards from '../components/rewards';

import AddHabit from '../components/AddHabit';
import AddTodos from '../components/AddTodos';
// import AddReward from '../components/AddReward';
import ModifyHabit from '../components/ModifyHabit';
// import ModifyTodos from '../components/ModifyTodos';
// import ModifyReward from '../components/ModifyReward';


const habitStack = createStackNavigator({
  Habits : { screen : Habits },
  // AddHabit : { screen : AddHabit },
  // ModifyHabit : { screen : ModifyHabit }
},
{headerMode: 'none'});

const todosStack = createStackNavigator({
  Todos : { screen : Todos },
  AddTodos : { screen : AddTodos },

  // ModifyTodos : { screen : ModifyTodos }
},
{headerMode: 'none'});

const rewardStack = createStackNavigator({
  Reward : { screen : Rewards },
  // AddReward : { screen : AddReward },
  // ModifyReward : { screen : ModifyReward }
},
{headerMode: 'none'});

const AppTabNavigator = createMaterialTopTabNavigator({
  habitStack : { screen : habitStack },
  todosStack : { screen : todosStack },
  rewardStack : { screen : rewardStack },
  
},                                                    {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
        ...Platform.select({
        android:{
          backgroundColor:'#f4da6c',
        },
      }),
      },
    iconStyle: { height: 15 },
    activeTintColor: '#000',
    // inactiveTintColor: '#d1cece',
    inactiveTintColor: 'white',
    upperCaseLabel: false,
    showLabel: true,
    showIcon: true,
  },
});

  // const drawerNavigator = createDrawerNavigator({
  //   AppTabNavigator : { screen : AppTabNavigator },
  //   ItemshopScreen : { screen : ItemshopScreen },
  //   CharacterchangeScreen : { screen : CharacterchangeScreen },
  //   AuthLoading: { screen : AuthLoadingScreen}
  // },
  //   { contentComponent : DrawerContainer },
  // );

const DrawerStack = createDrawerNavigator({
  AppTabNavigator : { screen : AppTabNavigator },
  ItemshopScreen : { screen : ItemshopScreen },
  CharacterchangeScreen : { screen : CharacterchangeScreen },
},
  {
    contentComponent: DrawerContainer,
    initialRouteName : 'AppTabNavigator',
    navigationOptions : ({navigation}) =>({
      headerLeft: <Button title = 'menu'
      onPress={() => navigation.openDrawer()}></Button>,
    })

  })

const drawerNavigator = createStackNavigator({
  DrawerStack: { screen: DrawerStack },
},                                           {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: 'red' },
    title: 'Welcome!',
    headerTintColor: 'black',
  }),
})

  

const HomeScreen = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Signin : Signin,
    Signup : Signup,
    drawerNavigator : { screen : drawerNavigator },
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

export default HomeScreen;
