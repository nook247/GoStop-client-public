import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Characterinfo from '../components/characterinfo';
import Todos from '../components/todos';
// import Sidebar from '../components/Sidebar';
import Underbar from '../components/Underbar';
import combineReducers from '../reducers/index';
import AddTodosScreen from './addTodosScreen';
import { Icon } from 'native-base';

export default class TodosScreen extends React.Component <any, any> {
// class Todosscreen extends React.Component <any, any> {
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
          title='Add Todos'
          onPress={() => navigate('AddTodosScreen')}
          />
        </View>

      <View style = {{ flex : 9 }}>
        <Todos/>
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

// const mainNavigator = createStackNavigator({
//   Todosscreen: { screen: Todosscreen },
//   AddTodosScreen : { screen : AddTodosScreen },
// });
// const TodosScreen = createAppContainer(mainNavigator);
// export default TodosScreen;

