import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HabitScreen from './HabitScreen';
import App from '../../App'

class AddHabitscreen extends React.Component <any, any> {
 render() {
   console.log('addprop',this.props)
  console.log('addkey',this.props.navigation.state.key)
   return (
     
<View>
<Text>
  habits 추가
  <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack(0)}
        />
</Text>
</View>
   );
 }
}

const MainNavigator = createStackNavigator({
  AddHabitscreen : { screen : AddHabitscreen },
});
const AddHabitsScreen = createAppContainer(MainNavigator);
export default AddHabitsScreen;
