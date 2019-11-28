import React, { Component } from 'react';
import { View } from 'react-native';
// import Characterinfo from '../components/characterinfo';
// tslint:disable-next-line: ordered-imports
import Item from '../components/Item';


export default class CharacterchangeScreen extends Component<any, any> {
  public render() {
    return (
      // <Provider store = {store} style = {{ width : '100%' }}>
            <View>
                {/* <Characterinfo style = {{ flex : 2 }}/> */}

                <Item />
            </View>
            // </Provider>
    );
  }
}
