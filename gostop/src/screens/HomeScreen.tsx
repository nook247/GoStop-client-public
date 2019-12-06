import React from 'react';
import { Platform, View,  StyleSheet } from 'react-native';
import { createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DrawerContainer from '../components/Drawer';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import AuthLoadingScreen from './AuthLoadingScreen';
import Habits from '../components/habits';
import Todos from '../components/todos';
import Rewards from '../components/rewards';
import AddHabit from '../components/AddHabit';
import AddTodos from '../components/AddTodos';
import AddReward from '../components/AddReward';
import ModifyHabit from '../components/ModifyHabit';
import ModifyTodos from '../components/ModifyTodos';
import ModifyReward from '../components/ModifyReward';
import { Ionicons } from '@expo/vector-icons';
import Item from '../components/Item';
import Itemshop from '../components/Itemshop';

const habitStack = createStackNavigator(
  {
    Habits : { screen : Habits },
    AddHabit : { screen : AddHabit },
    ModifyHabit : { screen : ModifyHabit },
  },
  {
    headerMode: 'none' });

const todosStack = createStackNavigator(
  {
    Todos : { screen : Todos },
    AddTodos : { screen : AddTodos },
    ModifyTodos : { screen : ModifyTodos },
  },
  {
    headerMode: 'none' });

const rewardStack = createStackNavigator(
  {
    Reward : { screen : Rewards },
    AddReward : { screen : AddReward },
    ModifyReward : { screen : ModifyReward },
  },
  {
    headerMode: 'none' });

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    habits : { screen : habitStack },
    todos : { screen : todosStack },
    rewards : { screen : rewardStack },
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        ...Platform.select({
          android:{
            backgroundColor:'#110133',
            height : '7%',
          },
        }),
      },
      labelStyle: {
        fontSize: 15,
      },
      activeTintColor: '#ffdc34',
      inactiveTintColor: 'white',
      upperCaseLabel: false,
    },
  });

const DrawerStack = createDrawerNavigator(
  {
    AppTabNavigator : { screen : AppTabNavigator },
    Itemshop : { screen : Itemshop },
    Item : { screen : Item },
  },
  {
    contentComponent: DrawerContainer,
    initialRouteName : 'AppTabNavigator',
    navigationOptions : ({ navigation }) => ({
      headerTitleStyle: { alignSelf: 'center', color : 'white', fontSize : 20 },
      title : 'JUST DO THE NEXT RIGHT THING',
      headerLeft:
      <View style = {styles.menu}>
        <Ionicons name = 'md-menu' onPress={() => navigation.toggleDrawer()} size = {34} color = '#ffdc34' />
        </View>,
      headerStyle: {
        backgroundColor: '#110133',
      },
    }),
  });

const styles = StyleSheet.create({
  menu: {
    marginLeft : 17,
  },
});

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
