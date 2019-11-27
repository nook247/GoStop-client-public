import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import AddTodos from '../components/AddTodos';

export default class AddTodosScreen extends React.Component <any, any> {
  public render() {
    return (
    <View style = {styles.container}>
         <Button title = "go back" onPress={() => this.props.navigation.goBack()} />
      <AddTodos />
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
  }
})