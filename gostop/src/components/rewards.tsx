import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, AsyncStorage, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { coinchange } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import savereward from '../actions/rewardaction';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';

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

          if(!data.rewards.length){
          //   let initState = {
          //     id : '',
          //     title : '제목을 입력하세요',
          //     desc : '설명을 입력하세요',
          //     coin : 10,
          //   }
          // this.props.savereward([initState]);
          } else {
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
       }
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
        <View style ={{ flex : 7 }}>
          <Characterinfo/>
        </View>


        <View style = {{ flex : 20, backgroundColor : 'white' }}>

        <ScrollView style={styles.scrollView}>
        {this.props.rewardarr.map((item, index) => {
          return   <View style = {styles.onehabit} key = {index}>

        <View style = {styles.positive}>
        <FontAwesome name = 'gift' size = {36} color = 'white' />

        </View>

        <View style = {styles.habits}
              onTouchEnd = {() => {
                this.props.navigation.navigate('ModifyReward', {
                  title : item.title,
                })
              }} >
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.description}</Text>
      </View >
      <View style = {styles.negative}>

      <TouchableOpacity style={{ justifyContent : 'center', alignItems : 'center'  ,backgroundColor:'transparent' }}
      onPress = {() => { 
        console.log('보상 구매했니?')
        Alert.alert(
          '보상을 구매하시겠습니까?',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', 
            onPress: () => {
              this.props.coinchange(-(item.coin));
            }
            }
          ],
          {cancelable: false},
        );
        }}
      >
        <Text style = {styles.coin}>{item.coin}</Text>
        <Image
        style={{ width: 20, height: 20 }}
        source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}
        
                      />
        </TouchableOpacity>
      </View>

      </View>;

        })
    }

</ScrollView>
    </View>

    <View style = {styles.addcontainer}>
          <TouchableOpacity style={styles.addBtn}
              onPress={() => this.props.navigation.navigate('AddReward')} >
            <MaterialIcons name = 'playlist-add' size = {52} color = '#110133' />
          </TouchableOpacity>
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
  coin : {
    fontSize : 20,
    marginRight : 3,
    color : 'white',
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



