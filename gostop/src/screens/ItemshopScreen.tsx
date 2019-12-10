import React, { Component } from 'react';
// tslint:disable-next-line: ordered-imports
import { StyleSheet, Text, View } from 'react-native';
// tslint:disable-next-line: ordered-imports
// import { Provider } from 'react-redux';
import Characterinfo from '../components/characterinfo';
import Itemshop from '../components/Itemshop';

// const store = createStore(combineReducers);

// tslint:disable-next-line: whitespace
export default class ItemshopScreen extends Component<any,any> {
  public render() {
    return (
      // <Provider store = {store}>
            <View style = {{ borderWidth : 1, borderColor : 'red' }}>
                <Characterinfo style = {{ flex : 2 }}/>

                <Itemshop style = {{ flex : 5 }} />

            </View>
      // </Provider>
    );
  }
}
