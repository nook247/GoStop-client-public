import React, { Component } from 'react';
import {
  AsyncStorage,
  View, 
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import fakeserver from '../fakeserver';

export default class Signin extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordmsg : '비밀번호를 한 번 더 입력해주세요',
    };
    };
  
  handleEmail = text => {
    this.setState({ email: text });
  };
 
  handlePassword = text => {
    this.setState({ password: text });
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
      const cookie = res.headers['map']['set-cookie'];
      console.log('쿠키니?', cookie);

      AsyncStorage.setItem('token', cookie);
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json()
      .then(() =>  { this.props.navigation.navigate('Habits');
      }
      );
      }
    })
    .catch((error) => console.log('fetch error', error))
  };

  google_login = () =>{
    const req = new Request(`${fakeserver}/auth/google`);
    fetch(req).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.text().then(text => console.log(text));
      } else {
        console.error(res.statusText);
      }
    });
  }
 
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
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.google_login()}
        >
          <Text style={styles.submitButtonText}>Google Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate('Signup')}
        >
          <Text style={styles.submitButtonText}>회원가입</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

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