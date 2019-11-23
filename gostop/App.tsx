import { Container } from 'native-base';
import React, { Component } from 'react';
import  HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './src/reducers/index';

export default class App extends Component{
  public render() {
    return(
      <Provider store = {store}>
        <Container>
          <HomeScreen />
        </Container>
        </Provider>
    );
  }
}

const store = createStore(combineReducers);
// import { StyleSheet, Text, View } from 'react-native';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import Item from './src/components/Item';
// import reducers from './src/reducers/index';

// const store = createStore(reducers);
// export default class App extends Component {
//   public render() {
//     return (
//       <Provider store={store}>
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Item Shop</Text>
//       </View>
//       <Item/>
//       </Provider>

//     );
//   }
// }

// const store = createStore(reducer);

// const MainNavigator = createStackNavigator({
//   Home: { screen: HomeScreen },
//   HabitScreen: { screen: HabitScreen },
//   // AddHabitsScreen : { screen : AddHabitsScreen },
// });
// const App = createAppContainer(MainNavigator);
// export default App;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     width: 300,
//     height: '10%',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     height: 50,

//   },
// });
