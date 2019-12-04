import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { coinchange, healthchange, pointchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import  savehabit  from '../actions/habitaction';
import { getuser } from '../actions/getuseraction';
// import Icon from 'react-native-ionicons';
import AntDesign from '@expo/vector-icons/AntDesign'
import {Ionicons} from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
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


async getdata(){
    let token = '';
    await AsyncStorage.getItem('token', (err, result) => {
      token = result
    }
    )
    let header = new Headers();
    header.append('Cookie', token)
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
          await this.props.getuser(data._id, data.email, data.name, data.userCode,data.level, data.health, data.point, data.coin, token);
        }
        )}}
        )
        .catch((err) => {
          console.log('get userinfo failed!');
          this.props.navigation.navigate(Signin);
        });

    fetch(`${fakeserver}/users/habits`, myInit)
    .then((res) => {
      if (res.status === 200 || res.status === 201) { 
        res.json()
        .then( (data) => {
          if (!data.habits.length) {
            // let initState = {
            //   id : '',
            //   title : '제목을 입력하세요',
            //   description : '설명을 입력하세요',
            //   // alarmId : '',
            //   difficulty : 3,
            //   positive : true
            // };
            // this.props.savehabit([initState]);
          } else {
            const habits = [];
            data.habits.forEach( element => {
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

public componentDidMount() {

  this.getdata();
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
                  onPress = {() => { this.props.pointchange(item.difficulty * 10);
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
            </ScrollView>

      </View>

      <View style = {styles.addcontainer}>
          <TouchableOpacity style={styles.addBtn}
              onPress={() => this.props.navigation.navigate('AddHabit')} >
            <MaterialIcons name = 'playlist-add' size = {52} color = '#110133' />
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

const mapDispatchToProps = dispatch => {
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
    color : '#110133',
  },
  habitdesc : {
    flex : 1,
    fontSize : 14,
    color : '#110133',
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
    backgroundColor:'white',
    marginRight : 15,
    borderRadius : 10,
    borderWidth : 1,
    borderColor : '#110133',
  },
});
