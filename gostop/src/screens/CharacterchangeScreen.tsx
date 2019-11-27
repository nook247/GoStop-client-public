import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Characterinfo from '../components/characterinfo'
import { createStore } from 'redux';
import combineReducers from '../reducers/index';
import { connect } from 'react-redux';
import { coinchange, healthchange, pointchange } from '../actions/characterinfoaction';


class CharacterchangeScreen extends Component<any, any> {
  public render() {
    return (
            <View style = {{ borderWidth : 1, borderColor : 'red' }}>
                <Characterinfo />

                <TouchableOpacity style={{ backgroundColor:'blue' }}
          onPress = {() => {
            this.props.coinchange(-30);
          }}>
              <Text>++</Text>
            </TouchableOpacity>
            </View>
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