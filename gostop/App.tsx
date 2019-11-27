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


// import React from "react";
// import { View } from "native-base";
// import { Button, StyleSheet } from "react-native"
// import * as Permissions from 'expo-permissions';

// export default class App extends React.Component<any, any> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       status : '',
//     };
//   }

//   async checkPermisson() {
//     // const { Permissions } = Expo;
//     const { status } = await Permissions.getAsync(Permissions.CAMERA);
//     if (status !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA);
//       this.setState({
//         status : status,
//       })
//     } else {
//       this.setState({
//         status : status,
//       }
//       )
//       alert('Hey!  they are good.');
//     }
//   }

//   render() {
//     // ...
//     return (
//       <View style={styles.container}>
//         <Button
//           title= "Select image"
//           onPress={() => {
//             if(this.state.status !== 'granted') {
//               this.checkPermisson();
//             } else {
//               alert('good!');
//             }  }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//     borderColor: 'black',
//     flex: 1,
//     width : '100%',
//   },
// });
