import React, { Component } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { coinchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';

export interface Reward {
  id : number;
  userId : number;
  title : string;
  desc : string;
  coin : number;
}

interface rewardsinfoProps {
  coinchange(value : number) : void;
}

interface rewardsStates {
  rewards : Reward[];
}

class Rewards extends Component<rewardsinfoProps, rewardsStates> {
  constructor(props) {
    super(props);
    this.state = {
      rewards : [],
    };
  }

  public componentDidMount() {
    fetch(`${fakeserver}/rewards`).then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json().then(data => {
          const newrewards = this.state.rewards.slice();

          data.map(elem => {
            newrewards.push({ id : elem.id, userId : elem.userId,
              title : elem.title, desc : elem.description, coin : elem.coin });
          });

          this.setState({
            rewards: newrewards,
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

        {this.state.rewards.map((item) => {
          return   <View style = {styles.onehabit} key = {item.title}>

      <View style = {styles.habits}>
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.desc}</Text>

      </View >

      <View style = {styles.negative}>
      <TouchableOpacity style={{ backgroundColor:'gray' }}
      onPress = {() => { this.props.coinchange(-(item.coin)); }}>
          <Text>--</Text>
        </TouchableOpacity>
      </View>

      </View>;

        })
    }
            </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    coinchange : value => dispatch(coinchange(value)),
  };
};

export default connect(null, mapDispatchToProps)(Rewards);

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
