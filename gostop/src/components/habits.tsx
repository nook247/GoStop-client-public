import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { coinchange, healthchange, pointchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import  savehabit  from '../actions/habitaction';
import { getuser } from '../actions/getuseraction';


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
          console.log('token---------', token)
          await this.props.getuser(data._id, data.email, data.name, data.userCode,data.level, data.health, data.point, data.coin, token);
        }
        )}}
        )

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
              <View style ={{flex : 5}}>
                <Characterinfo/>
              </View>

      <View style = { { flex : 1 } }>
          <Button
          title='Add habits'
          onPress={() => navigate('AddHabit')}
          />
        </View>

              <View style = {{ flex : 9 }}>
          <TouchableOpacity style={{ backgroundColor:'skyblue' }}
          onPress={() =>
          this.props.navigation.navigate('AddHabit')}>
          </TouchableOpacity>

          <ScrollView style={styles.scrollView}>
        {this.props.habitarr.map((item) => {
          return   <View style = {styles.onehabit} key = {item.title}>

          <View style = {styles.positive}>
          <TouchableOpacity style={{ backgroundColor:'blue' }}
          onPress = {() => { this.props.pointchange(item.difficulty * 10);
            this.props.coinchange(item.difficulty * 10);
          }}>
              <Text>++</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor:'skyblue' }}
          onPress = {() => {
            this.props.navigation.navigate('ModifyHabit', {
              title : item.title,
            })
          }}
          >
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor:'skyblue' }}
          onPress = {() => {
            console.log(this.props.habitarr);
            console.log(item.title)
            for(let i=0; i<this.props.habitarr.length; i++){
              if(this.props.habitarr[i].title === item.title){
                this.props.habitarr.splice(i,1);
                const newhabitarr = this.props.habitarr;
                this.props.savehabit(newhabitarr)
                console.log('newhabitarr',newhabitarr)
                this.props.navigation.navigate('Habits')
              }
            } 
            
          }}
          >
              <Text>삭제</Text>
            </TouchableOpacity>
            
      </View>

      <View style = {styles.habits}>
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.description}</Text>

      </View >

      <View style = {styles.negative}>
      <TouchableOpacity style={{ backgroundColor:'gray' }}
      onPress = {() => { this.props.healthchange(item.difficulty * 10); }}>
          <Text>--</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* <Text>알람여부{item.alarmId}</Text> */}
        <Text>알람여부</Text>
      </View>

      </View>;

        })
    }
    </ScrollView>

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
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    width : '100%',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  onehabit : {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection : 'row',
    height : 70,
  },
  positive: {
    flex: 1,
  },
  negative: {
    flex: 1,
  },
  habits: {
    flex: 6,
  },
  habittitle :{
    flex : 2,
    fontSize : 20,
  },
  habitdesc : {
    flex : 1,
    fontSize : 14,
  },
});
