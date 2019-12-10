import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Characterinfo from '../components/characterinfo'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from '../reducers/index';
import Item from '../components/Item';
import { connect } from 'react-redux';
import { coinchange, healthchange, pointchange } from '../actions/characterinfoaction';


class CharacterchangeScreen extends Component<any, any> {
  public render() {
    return (
      // <Provider store = {store} style = {{ width : '100%' }}>
            <View style = {{ borderWidth : 1, borderColor : 'red' }}>
                <Characterinfo style = {{ flex : 2 }}/>

                <TouchableOpacity style={{ backgroundColor:'blue' }}
          onPress = {() => {
            this.props.coinchange(-30);
          }}>
              <Text>++</Text>
            </TouchableOpacity>
                {/* <Item style = {{ flex : 5 }} /> */}
            </View>
            // </Provider>
      );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      pointchange : value => dispatch(pointchange(value)),
      coinchange : value => dispatch(coinchange(value)),
      healthchange : value => dispatch(healthchange(value)),
    };
  };

  export default connect(null, mapDispatchToProps)(CharacterchangeScreen);


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