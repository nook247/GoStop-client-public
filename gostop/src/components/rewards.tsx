import React, { Component } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { coinchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import savereward from '../actions/rewardaction';

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

          // if(!data.rewards.length){
          //   let initState = {
          //     id : '',
          //     title : '제목을 입력하세요',
          //     desc : '설명을 입력하세요',
          //     coin : 10,
          //   }
          // } else {
            const rewards = [];
            data.rewards.forEach( element => {
              const rewardobj = {
                id : element["_id"],
                title : element["title"],
                description : element["description"],
                coin : element["coin"]
              }
              rewards.push(rewardobj);
            })
            this.props.savereward(rewards);
       // }
      }

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
          onPress={() => navigate('AddReward')}
          />
        </View>

              <View style = {{ flex : 9 }}>
        {this.props.rewardarr.map((item) => {
          return   <View style = {styles.onehabit} key = {item.title}>

<View style = {styles.positive}>

            <TouchableOpacity style={{ backgroundColor:'skyblue' }}
          onPress = {() => {
            this.props.navigation.navigate('ModifyReward', {
              title : item.title,
            })
          }}
          >
              <Text>수정</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ backgroundColor:'skyblue' }}
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
            </TouchableOpacity> */}
            
      </View>

      <View style = {styles.habits}>
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.description}</Text>

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

const mapStateToProps = (state) => {
  return {
    rewardarr : state.rewardreducer.rewardarr,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    coinchange : value => dispatch(coinchange(value)),
    savereward : (arr) => {
      dispatch(savereward(arr));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);

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
