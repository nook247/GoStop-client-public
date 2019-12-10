// import { ScrollView, SafeAreaView, DrawerItems } from "react-navigation";
// import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

// const LogoutButton = (props) => (
//     <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
//       <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//         <DrawerItems {...props} />
//       </SafeAreaView>
//       <TouchableOpacity>
//         <View style={styles.item}>
//           <View style={styles.iconContainer}>
//             <Image source={{uri:'https://cdn.icon-icons.com/icons2/520/PNG/512/Logout_icon-icons.com_52027.png'}}
//              style={styles.icon}></Image>
//           </View>
//           <Text style={styles.label}>Logout</Text>
//         </View>
//       </TouchableOpacity>
//     </ScrollView>

//   );

//   export default LogoutButton;
  
//   const styles = StyleSheet.create({
//     item: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     label: {
//       margin: 16,
//       fontWeight: 'bold',
//       color: 'rgba(0, 0, 0, .87)',
//     },
//     iconContainer: {
//       marginHorizontal: 16,
//       width: 24,
//       alignItems: 'center',
//     },
//     icon: {
//       width: 24,
//       height: 24,
//     }
//   });

import React from 'react'
import { StyleSheet, Text, View, Alert, AsyncStorage, Button } from 'react-native';
import { } from 'react-navigation';
import fakeserver from '../fakeserver';

export default class DrawerContainer extends React.Component<any, any> {

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('AppTabNavigator')}
          style={styles.uglyDrawerItem}>
          mainpage
        </Text>
        <Text
          onPress={() => navigation.navigate('ItemshopScreen')}
          style={styles.uglyDrawerItem}>
          Itemshop
        </Text>
        <Text
          onPress={() => navigation.navigate('CharacterchangeScreen')}
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
          style={styles.uglyDrawerItem}>
          Logout
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
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})