import React, { Component } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { coinchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';

export interface Reward {
  id : string;
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

class Rewards extends Component<any, rewardsStates> {
  constructor(props) {
    super(props);
    this.state = {
      rewards : [],
    };
  }

  public async componentDidMount() {
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
    }
    fetch(`${fakeserver}/users/rewards`, myInit)
    .then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json()
        .then(data => {
          const newrewards = this.state.rewards.slice();

          if(!data.rewards.length){
            let initState = {
              id : '',
              title : '제목을 입력하세요',
              desc : '설명을 입력하세요',
              coin : 10,
            }
            newrewards.push(initState)
          } else {

          data.rewards.map(elem => {
            newrewards.push({ id : elem.id,
              title : elem.title, desc : elem.description, coin : elem.coin });
          });
        }

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
    const { navigate } = this.props.navigation;
    return (
            <View style = {styles.container}>
              <View style ={{flex : 5}}>
                <Characterinfo/>
              </View>

      <View style = { { flex : 1 } }>
          <Button
          title='Add reward'
          onPress={() => navigate('AddRewardScreen')}
          />
        </View>

        

              <View style = {{ flex : 9 }}>
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
