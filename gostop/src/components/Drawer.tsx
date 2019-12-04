import React from 'react'
import { StyleSheet, Text, View, Alert, AsyncStorage, Button } from 'react-native';
import { } from 'react-navigation';
import fakeserver from '../fakeserver';
import { Ionicons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

export default class DrawerContainer extends React.Component<any, any> {
  // static navigationOptions = {
  //   navigationOptions : ({ navigation }) => ({
  //     headerTitleStyle: { alignSelf: 'center', color : 'white' },
  // // title: 'Center Title',
  //     title: 'username',
  //     headerLeft:

  //       <Ionicons name = 'md-menu' onPress={() => navigation.openDrawer()} size = {34} color = '#ffdc34' />,
  //     headerStyle: {
  //       backgroundColor: '#110133',
  //     },
  //   }),
  // };


  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('AppTabNavigator')}
          style={styles.uglyDrawerItem}>
          Tasks
        </Text>
        <Text
          onPress={() => navigation.navigate('Itemshop')}
          style={styles.uglyDrawerItem}>
            Itemshop
        </Text>
        <Text
          onPress={() => navigation.navigate('Item')}
          style={styles.uglyDrawerItem}>
          Character
        </Text>
        <Text
          onPress={() => {

            Alert.alert(
              '로그아웃하시겠습니까?',
              '',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                  fetch(`${fakeserver}/auth/login`, {
                    method : 'POST',
                    headers : {
                      'Content-Type' : 'application/json',
                    },
                  })
                  .then((res) => {
                    console.log(res);
                    AsyncStorage.removeItem('token');
                    navigation.navigate('AuthLoading') })
                }
                }
              ],
              {cancelable: false},
            );

          }
          }
          style={styles.uglyDrawerItem}>Logout
         {/* <SimpleLineIcons name = 'logout' size = {36} color = '#110133' /> */}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#110133',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    // borderColor: '#E73536',
    borderColor : '#110133',
    borderWidth: 1,
    textAlign: 'center'
  }
})