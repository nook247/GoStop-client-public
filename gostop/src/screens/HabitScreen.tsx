import React from 'react';
import { Button, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import Characterinfo from '../components/characterinfo';
import Habits from '../components/habits';
import { createStore } from 'redux';
import reducer from '../reducers/reducer';
import AddHabitsScreen from './addHabitsScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Habitscreen extends React.Component <any, any> {
 render() {
  console.log('habitkey',this.props.navigation.state.key)
  const { navigate } = this.props.navigation;
   return (
      <Provider store = {store}>
      <View>
      <Characterinfo/>
        <View>
          <Button
          title='Add habits'
          onPress={() => navigate('AddHabitsScreen')}
         
          />
        </View>
      <Habits/>
      <Text>
        여기에 하단바가 들어갑니다
      </Text>
      </View>
      </Provider>
   );
 }
}

const MainNavigator = createStackNavigator({
  Habitscreen: { screen: Habitscreen },
  AddHabitsScreen : { screen : AddHabitsScreen },
});
const HabitScreen = createAppContainer(MainNavigator);
export default HabitScreen;

const store = createStore(reducer);
