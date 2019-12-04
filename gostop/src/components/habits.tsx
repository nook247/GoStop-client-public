import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { coinchange, healthchange, pointchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import  savehabit  from '../actions/habitaction';
import { getuser } from '../actions/getuseraction';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Signin from './Signin';

export interface Habit {
  id : string;
  title : string;
  desc : string;
  // alarmId : string;
  difficulty : number;
  positive : boolean;
}

interface habitsinfoProps {
  pointchange(value : number) : void;
  coinchange(value : number) : void;
  healthchange(value : number) : void;
}

interface habitsStates {
  habits : Habit[];
  count : number;
}

class Habits extends Component<any, habitsStates> {
  constructor(props) {
    super(props);
  }

  async getrefreshtoken () {
    let refreshtoken = '';
    await AsyncStorage.getItem('refreshtoken', (err, result) => {
      refreshtoken = result;
    });
    const myInit = {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(
        { refreshToken : refreshtoken },
      ),
    };

    fetch(`${fakeserver}/auth/refresh`, myInit)
    .then((res) => {
      console.log('리프레시 요청보내고 나서 받은 헤더야!!, 새로운 토큰 들어있니?', res.headers['map']['set-cookie']);
      const newcookie = res.headers['map']['set-cookie'];
      if (res.status === 200 || res.status === 201) {
        res.json()
        .then(async (data) => {
          await this.props.getuser(data._id, data.email, data.name, data.userCode, data.level, data.health, data.point, data.coin, newcookie);
          await AsyncStorage.setItem('token', newcookie);
        });
      }
    })
    .catch((err) => {
      console.log('refresh request failed!', err);
      this.props.navigation.navigate(Signin);
    });
  }

  async getdata() {
    let token = '';
    await AsyncStorage.getItem('token', (err, result) => {
      token = result;
    });
    let header = new Headers();
    header.append('Cookie', token);
    const myInit = {
      method : 'GET',
      headers : header,
      Cookie : token,
    }

    fetch(`${fakeserver}/users/info`, myInit)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.json()
          .then(async (data) => {
            await this.props.getuser(data._id, data.email, data.name, data.userCode, data.level, data.health, data.point, data.coin, token);
          })
        }
      })
      .catch((err) => {
        console.log(err)
        console.log('get request failed!');
            // this.props.navigation.navigate(Signin);
      });

    fetch(`${fakeserver}/users/habits`, myInit)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.json()
          .then((data) => {
            if (!data.habits.length) {
              let initState = {
                id : '',
                title : '제목을 입력하세요',
                description : '설명을 입력하세요',
                // alarmId : 'aaa',
                difficulty : 1,
                positive : true,
              };
              this.props.savehabit([initState]);
            } else {
              const habits = [];
              data.habits.forEach((element) => {
                const habitobj = {
                  id : element['_id'],
                  title : element['title'],
                  description : element['description'],
                  difficulty : element['difficulty'],
                  positive : element['positive'],
                  // alarmId : element["alarmId"] || '',
                }
                habits.push(habitobj);
              })
              this.props.savehabit(habits);

            }
          },

              );
        } else {
          console.error(res.statusText);
        }
      }).catch(err => console.error(err));

  }

  public async componentDidMount() {
    this.getdata();
    this.getrefreshtoken();
    
    // AsyncStorage.removeItem('token');
    // this.props.navigation.navigate('AuthLoading');
  }

  public render() {

    const { navigate } = this.props.navigation;
    return (
            <View style = {styles.container}>
              <View style ={{ flex : 7 }}>
                <Characterinfo/>
              </View>

              <View style = {{ flex : 20,  backgroundColor : 'white' }}>

                  <ScrollView style={styles.scrollView}>
                {this.props.habitarr.map((item, index) => {
                  return   <View style = {styles.onehabit} key = {index}>

                  <View style = {styles.positive}>
                  <TouchableOpacity style={{ backgroundColor:'transparent' }}
                  onPress = {() => {
                    this.props.pointchange(item.difficulty * 10);
                    this.props.coinchange(item.difficulty * 10);
                  }}>
                    <Entypo name = 'circle-with-plus' size = {36} color = 'white' />
                    </TouchableOpacity>
                </View>

              <View style = {styles.habits}
                      onTouchEnd = {() => {
                        this.props.navigation.navigate('ModifyHabit', {
                          title : item.title,
                        });
                      }}
              >
                  <Text style = {styles.habittitle}>{item.title}</Text>
                  <Text style = {styles.habitdesc}>{item.description}</Text>

              </View >

              <View style = {styles.negative}>
              <TouchableOpacity style={{ backgroundColor:'transparent' }}
              onPress = {() => { this.props.healthchange(item.difficulty * 10); }}>
                <Entypo name = 'circle-with-minus' size = {36} color = 'white' />
                </TouchableOpacity>
              </View>
              </View>;

                })
            }
            <View style = {{ flex : 10, backgroundColor : 'transparent', height : 100 }}>
            </View>
            </ScrollView>

      </View>

      <View style = {{ position: 'absolute', backgroundColor: 'transparent', right: 165, bottom: 10 }}>
          <TouchableOpacity style={styles.addBtn}
              onPress={() => this.props.navigation.navigate('AddHabit')} >
            <MaterialIcons name = 'playlist-add' size = {52} color = 'white' />
          </TouchableOpacity>
      </View>

   </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    habitarr : state.habitreducer.habitarr,
  };

};

const mapDispatchToProps = (dispatch) => {
  return {
    pointchange : value => dispatch(pointchange(value)),
    coinchange : value => dispatch(coinchange(value)),
    healthchange : value => dispatch(healthchange(value)),
    savehabit : (arr) => {
      dispatch(savehabit(arr));
    },
    getuser : (id, email, name, userCode, level, health, point, coin, token) => {
      dispatch(getuser(id, email, name, userCode, level, health, point, coin, token))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Habits);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : '100%',
  },
  scrollView: {
  },
  onehabit : {
    flexDirection : 'row',
    flex : 18,
    // height : 70,
    // width : '100%',
    borderBottomColor : '#F4F4F5',
    borderBottomWidth : 1,
  },
  positive: {
    flex: 1,
    backgroundColor : '#ffdc34',
    justifyContent : 'center',
    alignItems : 'center',
  },
  negative: {
    flex: 1,
    backgroundColor : '#ffdc34',
    justifyContent : 'center',
    alignItems : 'center',
  },
  habits: {
    flex: 6,
    paddingHorizontal : 17,
    paddingVertical : 10,
  },
  habittitle :{
    flex : 1,
    fontSize : 20,
    color : 'black',
  },
  habitdesc : {
    flex : 1,
    fontSize : 14,
    color : 'silver',
  },
  addcontainer : {
    flex : 2,
    backgroundColor : 'white',
    justifyContent : 'flex-end',
    alignItems : 'center',
    flexDirection : 'row',
    margin : 20,
  },
  addBtn : {
    backgroundColor:'#110133',
    marginRight : 15,
    borderRadius : 10,
    borderWidth : 1,
    borderColor : '#110133',
  },
});
