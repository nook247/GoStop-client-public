import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import reducer from '../reducers/reducer';
import { decrement, increment } from '../actions/characterinfoaction';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HabitScreen from '../screens/HabitScreen';
import App from '../../App'

export interface Habit {
  title : string;
  desc : string;
  alarm : boolean;
  positive : boolean;
}

interface habitsinfoProps {
  plusvalue(value : number) : void;
  minusvalue(value : number) : void;
 // gethabitsinfo(title : string, desc : string, alarm : boolean) : void,

}

interface habitsStates {
  habits : Habit[];
}

class Habits extends Component<any, habitsStates> {
  constructor(props) {
    super(props);
    this.state = {
      habits : [],
    };
  }

  public componentDidMount() {
    fetch('http://localhost:3000/habits').then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json().then(data => {
          console.log('습관 get', data);

          console.log('!!!!!!!!!!!!!!!!!', this.state);
          const newhabits = this.state.habits.slice();

          data.map(elem => {
            newhabits.push({ title : elem.title, desc : elem.description, alarm : elem.alarm, positive : elem.positive });
          });

          this.setState({
            habits: newhabits,
          });
          console.log('!!!!!!!!!!!!!!!!!추가', this.state);
        },

            );
      } else { // 실패를 알리는 HTTP 상태 코드면
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));

  }
  public render() {
    return (
            <View style = {styles.container}>


        <View style = {styles.habitscontainer}>

        {this.state.habits.map((item) => {
          return   <View style = {styles.onehabit} key = {item.title}>

      <View style = {styles.positive}>
        <Button title ='++' onPress = {() => { this.props.plusvalue(10); }}/>
      </View>

      <View style = {styles.habits}>
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.desc}</Text>

      </View >

      <View style = {styles.negative}>
      <Button title ='--' onPress = {() => { this.props.minusvalue(10); }}/>
      </View>
      <View>
        <Text>알람여부{item.alarm}</Text>
      </View>

      </View>;

        })
    }

            </View>
            </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    plusvalue : value => dispatch(increment(value)),
    minusvalue : value => dispatch(decrement(value)),
  };
};

export default connect(null, mapDispatchToProps)(Habits);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    width : '100%',
  },
  addbutton : {
    borderWidth: 1,
    borderColor: 'black',
    flex : 1,
    marginBottom : 10,

    alignSelf : 'flex-end',
  },
  habitscontainer: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 8,
    width : '100%',
    alignItems : 'center',
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
