import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';
import fakeserver from '../fakeserver';
import Habits from './habits'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HabitScreen from '../screens/HabitScreen';
import TodosScreen from '../screens/TodosScreen';
import RewardScreen from '../screens/RewardScreen';
import { cookiesave } from '../actions/loginaction';
import { connect } from 'react-redux';
import loginreducer from '../reducers/LoginReducer';

interface loginProps {
  cookiesave(value : string) : void;
}
class Signin extends Component<any, any> {
  state = {
    email: '',
    password: '',
    passwordmsg : '비밀번호를 한 번 더 입력해주세요'
  };
 
  handleEmail = text => {
    this.setState({ email: text });
  };
 
  handlePassword = text => {
    this.setState({ password: text });
  };
  handlePasswordCheck = text => {
    if(this.state.password!==text){
      this.setState({
        passwordmsg : '비밀번호가 일치하지 않습니다'
      }) 

    } else {
      this.setState({
        passwordmsg : '비밀번호가 일치합니다'
      })
    }
  };
 
  login = (email, password) => {
    const logindata = {
      email : email,
      password : password,
    };

    console.log('logindata', logindata)
    
    fetch(`${fakeserver}/auth/login`, {
      method : 'POST',
      body : JSON.stringify(logindata),
      headers : {
        'Content-Type' : 'application/json',
      },
    }).then((res) => {
      console.log('response.headers', res.headers);
      console.log('response.setcookie', res.headers['map']['set-cookie']);
      const cookie = res.headers['map']['set-cookie'];
      // const start = res.headers['map']['set-cookie'].indexOf('=');
      // const end = res.headers['map']['set-cookie'].indexOf(';');
      // const cookie = res.headers['map']['set-cookie'].slice(start + 1 , end);
      console.log('쿠키니?', cookie);
      AsyncStorage.setItem('token', cookie);

      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json()
      .then(() => this.props.navigation.navigate('habitscreen')
      );
      }
    })
    .catch((error) => console.log('fetch error', error))
  };
 
  render() {
    return (
      <View style={styles.container}>
        <Text>Go?! Stop?!</Text>
        <Text>E-mail</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Email'
          placeholderTextColor='#9a73ef'
          autoCapitalize='none'
          onChangeText={this.handleEmail}
        />

        <Text>Password</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Password'
          placeholderTextColor='#9a73ef'
          autoCapitalize='none'
          onChangeText={this.handlePassword}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cookie : value => dispatch(cookiesave(value)),
  };
};

connect(null, mapDispatchToProps)(Signin);

const test = createStackNavigator({
  loginscreen : { screen : Signin},
  habitscreen : { screen : HabitScreen },
  todosscreen : { screen : TodosScreen },
  rewardscreen : { screen : RewardScreen },
  
})

const Login = createAppContainer(test);
export default Login;




const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: 'white'
  }
});