import React from 'react';
import { Button, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddHabit from '../components/AddHabit';

export default class AddHabitScreen extends React.Component <any, any> {
  public render() {

    return (
    <View>
   <Button title = "go back" onPress={() => this.props.navigation.goBack()} />
       <AddHabit />
    </View>
    );
  }
}

// const MainNavigator = createStackNavigator({
//   AddHabitscreen : { screen : AddHabitscreen },
// });
// const AddHabitsScreen = createAppContainer(MainNavigator);
// export default AddHabitsScreen;
