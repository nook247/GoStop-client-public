import { Container } from 'native-base';
import React, { Component } from 'react';
import  HomeScreen from './src/screens/HomeScreen';

export default class App extends Component{
  public render() {
    return(
        <Container>
          <HomeScreen />
        </Container>
    );
  }
}
