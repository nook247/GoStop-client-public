import React, { Component } from 'react';
import  HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './src/reducers/index';
import { StyleSheet, View, Text } from 'react-native';

export default class App extends Component{
  public render() {
    return(
      <Provider store = {store}>
        <View style = {styles.container}>
          <HomeScreen />
        </View>
      </Provider>

    );
  }
}

const store = createStore(combineReducers);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    width : '100%',
  },
});
