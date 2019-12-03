import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import fakeserver from '../fakeserver';

export default class Signup extends Component<any, any> {
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
      .then(() => {alert(`${email}로 가입이 완료되었습니다\n로그인 화면으로 이동`);
      this.props.navigation.navigate('Signin');
    });
      }
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style = {styles.header}>
        <Text style = {{ color : '#ffdc34', alignSelf : 'center',
          fontSize : 50, fontStyle : 'italic', fontWeight : 'bold' }}>Go?! Stop?!</Text>
          </View>
        <View style = {styles.body}>
        <Text style = {styles.categoryText}>이메일</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='  habit@gostop.com'
          placeholderTextColor='#dadada'
          autoCapitalize='none'
          onChangeText={this.handleEmail}
        />
        {/* <TouchableOpacity
          style={styles.submitButton}
          onPress={() => alert('이메일 중복확인')}
        >
          <Text style={styles.submitButtonText}>중복확인</Text>
        </TouchableOpacity> */}
        <Text style = {styles.categoryText}>닉네임</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          // placeholder='닉네임'
          placeholderTextColor='#9a73ef'
          autoCapitalize='none'
          onChangeText={this.handleNickname}
        />
        {/* <TouchableOpacity
          style={styles.submitButton}
          onPress={() => alert('닉네임 중복확인')}
        >
          <Text style={styles.submitButtonText}>중복확인</Text>
        </TouchableOpacity> */}
        <Text style = {styles.categoryText}>비밀번호</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          // placeholder='Password'
          placeholderTextColor='#9a73ef'
          autoCapitalize='none'
          onChangeText={this.handlePassword}
          secureTextEntry={true}
        />
        <Text style = {styles.categoryText}>비밀번호 재확인  [{this.state.passwordmsg}]</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          // placeholder='Password check'
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
          <Text style={styles.submitButtonText}>회원가입</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            this.props.navigation.navigate('Signin');
          }
        }
        >
          <Text style={styles.submitButtonText}>로그인 화면으로 이동</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    // backgroundColor : '#ffdc34',
  },
  header : {
    backgroundColor : '#110133',
    height : '15%',
    justifyContent : 'center',
    marginBottom : '5%',
  },
  body : {
    height : '85%',
  },
  categoryText : {
    marginLeft : 15,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#110133',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#110133',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: '#ffdc34',
    alignSelf : 'center',
  },
});
