import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Characterinfo from '../components/characterinfo'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from '../reducers/index';
import Item from '../components/Item';

export default class ItemshopScreen extends Component {
  public render() {
    return (
      <Provider store = {store} style = {{ width : '100%' }}>
            <View style = {{ borderWidth : 1, borderColor : 'red' }}>
                <Characterinfo style = {{ flex : 2 }}/>

                <Item style = {{ flex : 5 }} />
            </View>
            </Provider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    // flex: 1,
    width : '100%',
    // height : '100%',
    // justifyContent : "space-around"
  },
});

const store = createStore(combineReducers);