import React from 'react'
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import fakeserver from '../fakeserver';

export default class DrawerContainer extends React.Component<any, any> {

  render() {
    const { navigation } = this.props;
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
                  .then(async (res) => {
                    console.log(res);
                    await AsyncStorage.clear();
                    navigation.navigate('AuthLoading');
                  });
                },
                },
              ],
              { cancelable: false },
            );

          }
          }
          style={styles.uglyDrawerItem}>Logout
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
    paddingHorizontal: 20,
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#110133',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor : '#110133',
    borderWidth: 1,
    textAlign: 'center',
  },
});
