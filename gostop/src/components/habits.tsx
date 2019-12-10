import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { coinchange, healthchange, pointchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';

export interface Habit {
  title : string;
  desc : string;
  alarm : boolean;
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
}

class Habits extends Component<habitsinfoProps, habitsStates> {
  constructor(props) {
    super(props);
    this.state = {
      habits : [],
    };
  }

  public componentDidMount() {
    fetch(`${fakeserver}/habits`).then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json().then(data => {
          const newhabits = this.state.habits.slice();

          data.map(elem => {
            newhabits.push({ title : elem.title, desc : elem.description, alarm : elem.alarm,
              difficulty : elem.difficulty, positive : elem.positive });
          });

          this.setState({
            habits: newhabits,
          });
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

        {this.state.habits.map((item) => {
          return   <View style = {styles.onehabit} key = {item.title}>

          <View style = {styles.positive}>
          <TouchableOpacity style={{ backgroundColor:'blue' }}
          onPress = {() => { this.props.pointchange(item.difficulty * 10);
            this.props.coinchange(item.difficulty * 10);
          }}>
              <Text>++</Text>
            </TouchableOpacity>
      </View>

      <View style = {styles.habits}>
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.desc}</Text>

      </View >

      <View style = {styles.negative}>
      <TouchableOpacity style={{ backgroundColor:'gray' }}
      onPress = {() => { this.props.healthchange(item.difficulty * 10); }}>
          <Text>--</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>알람여부{item.alarm}</Text>
      </View>

      </View>;

        })
    }
            </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.changepointreducer.name,
    healthvalue : state.changepointreducer.healthvalue,
    pointsvalue : state.changepointreducer.pointsvalue,
    coinsvalue : state.changepointreducer.coinsvalue,
    level : state.changepointreducer.level,
  };

};

const mapDispatchToProps = dispatch => {
  return {
    pointchange : value => dispatch(pointchange(value)),
    coinchange : value => dispatch(coinchange(value)),
    healthchange : value => dispatch(healthchange(value)),
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
