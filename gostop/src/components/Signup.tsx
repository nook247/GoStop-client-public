import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import fakeserver from '../fakeserver';

export default class Signup extends Component {
  public state = {
    email: '',
    nickname : '',
    password: '',
    passwordmsg : '비밀번호를 한 번 더 입력해주세요',
  };

  public handleEmail = text => {
    this.setState({ email: text });
  }

  public handleNickname = text => {
    this.setState({ nickname: text });
  }

  public handlePassword = text => {
    this.setState({ password: text });
  }
  public handlePasswordCheck = text => {
    if (this.state.password !== text) {
      this.setState({
        passwordmsg : '비밀번호가 일치하지 않습니다',
      });

    } else {
      this.setState({
        passwordmsg : '비밀번호가 일치합니다',
      });
    }
  }

  public signup = (email) => {
    const signupdata = {
      email : this.state.email,
      name : this.state.nickname,
      password : this.state.password,
    };
    fetch(`${fakeserver}/auth/signup`, {
      method : 'POST',
      body : JSON.stringify(signupdata),
      headers : {
        'Content-Type' : 'application/json',
      },
    }).then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json()
      .then(() => alert(`${email}로 가입이 완료되었습니다\n로그인 화면으로 이동`));
      }
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text>회원가입</Text>
        <Text>E-mail</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Email'
          placeholderTextColor='#9a73ef'
          autoCapitalize='none'
          onChangeText={this.handleEmail}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => alert('이메일 중복확인')}
        >
          <Text style={styles.submitButtonText}>중복확인</Text>
        </TouchableOpacity>
        <Text>Nickname</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Nickname'
          placeholderTextColor='#9a73ef'
          autoCapitalize='none'
          onChangeText={this.handleNickname}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => alert('닉네임 중복확인')}
        >
          <Text style={styles.submitButtonText}>중복확인</Text>
        </TouchableOpacity>
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
        <Text>Password check [{this.state.passwordmsg}]</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Password check'
          placeholderTextColor='#9a73ef'
          autoCapitalize='none'
          onChangeText={this.handlePasswordCheck}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if (!this.state.email) {
              alert('이메일을 입력하세요');
            } else if (!this.state.nickname) {
              alert('닉네임을 입력하세요');
            } else if (this.state.passwordmsg !== '비밀번호가 일치합니다') {
              alert('비밀번호를 확인하세요');
            } else if (this.state.passwordmsg === '비밀번호가 일치합니다') {
              this.signup(this.state.email);
            }
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});
