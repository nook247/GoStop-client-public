import React, { Component } from 'react';
import { Platform, View, TouchableOpacity, Button, Text, Image, StyleSheet } from 'react-native';
import { createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, SafeAreaView, DrawerItems, ScrollView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ItemshopScreen from './ItemshopScreen';
import CharacterchangeScreen from './CharacterchangeScreen';;
import Signin from '../components/Signin'
import AddHabitScreen from './addHabitsScreen';
import AddTodosScreen from './addTodosScreen';
import AddRewardScreen from './addRewardScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import Habits from '../components/habits';
import Todos from '../components/todos';
import Rewards from '../components/rewards'
import Signup from '../components/Signup';
import AddHabit from '../components/AddHabit';
import AddTodos from '../components/AddTodos';
import DrawerContainer from '../components/Drawer';
import ModifyHabit from '../components/ModifyHabit'


interface UserState {
  level : number;
  healthvalue : number;
  pointsvalue : number;
  coinsvalue : number;
}

export class Homescreen extends Component<any, UserState> {
  [x: string]: any;
  public render() {
    return (
//       <View>
//         <Characterinfo />
//         {/* <Button title = "press" onPress={() => this.props.navigation.openDrawer()}/> */}
//         <AppTabNavigator/>
//       </View>
<View>
<TouchableOpacity  >
</TouchableOpacity>
<AppTabNavigator/>
</View>

    );
  }
}


const habitStack = createStackNavigator({
  Habits : { screen : Habits },
  AddHabit : { screen : AddHabit },
  ModifyHabit : { screen : ModifyHabit }
});

const todosStack = createStackNavigator({
  Todos : { screen : Todos },
  AddTodos : { screen : AddTodos },
});

const rewardStack = createStackNavigator({
  Reward : { screen : Rewards },
  AddRewardScreen : { screen : AddRewardScreen },
});

const AppTabNavigator = createMaterialTopTabNavigator({
  habitStack : { screen : habitStack },
  todosStack : { screen : todosStack },
  rewardStack : { screen : rewardStack },
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

  const drawerNavigator = createDrawerNavigator({
    AppTabNavigator : { screen : AppTabNavigator },
    ItemshopScreen : { screen : ItemshopScreen },
    CharacterchangeScreen : { screen : CharacterchangeScreen },
    AuthLoading: { screen : AuthLoadingScreen}},
    { contentComponent: DrawerContainer },
  );


const HomeScreen = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Signin : Signin,
    Signup : Signup,
    drawerNavigator : drawerNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default HomeScreen;


// const mainNavigator = createStackNavigator({
//   // Signin : { screen : Signin },
//   // Homescreen: { screen: Homescreen }
//   // Characterinfo : { screen : Characterinfo },
//   AppTabContainet : { screen : AppTabContainet },
//   // HabitScreen: { screen: HabitScreen },
//   // AddHabitsScreen : { screen : AddHabitScreen },
//   // TodosScreen : { screen : TodosScreen },
//   // RewardScreen : { screen : rewardScreen },
//   // ItemshopScreen : { screen : ItemshopScreen },
//   // CharacterchangeScreen : { screen : CharacterchangeScreen },
// });


// const HomeScreen = createAppContainer(mainNavigator);
// export default HomeScreen;
