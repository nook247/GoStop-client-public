import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCharacterInfo } from '../actions/characterinfoaction';

interface characterinfoProps {
  level : number;
  healthvalue : number;
  pointsvalue : number;
  coinsvalue : number;
  getcharacterinfo(health : number, point : number, coin : number, level : number): void;
}

class Characterinfo  extends React.Component<characterinfoProps, any> {
  public componentDidMount() {
    fetch('http://localhost:3000/users/1').then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json().then(data => {
          console.log('data', data);

          this.props.getcharacterinfo(data.health, data.point, data.coin, data.level);

        },

                ); // 텍스트 출력
      } else { // 실패를 알리는 HTTP 상태 코드면
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));

    console.log('---------------', this.props);
  }

  public render() {

    return (

            <View style={styles.container}>

            <View style={styles.body}>
              <View style={styles.left}>
              <Image
          style={styles.image}
          source={{ uri:'https://png.pngtree.com/png-clipart/20190630/original/pngtree-handsome-cartoon-dog-image-cute-dog-png-image_4180965.jpg' }}/>
                  <View style ={styles.level}>
                      <Text style = {styles.levelText}>level{this.props.level}</Text>
                  </View>
              </View>
              <View style={styles.right}>
               <View style={{ flex:1, width : 50, alignSelf : 'flex-end' }}>
               <Button
          title='kakaotalk' color = 'yellow'
          onPress={() => console.log('share Button pressed')}
        />
               </View>

                    <View style = {styles.health}>
                    <View style={{ flex:1 }}></View>
                <Text style = {{ flex : 1, height :10, width : this.props.healthvalue ,
                  backgroundColor : 'yellow', justifyContent:'flex-end' }}>health</Text>
                    </View>

                <View style = {styles.points}>
                <View style={{ flex:1 }}></View>
                <Text style = {{ flex : 1, height :10, width : this.props.pointsvalue,
                  backgroundColor : 'yellow', justifyContent:'flex-end' }}>points</Text>

                    </View>

                    <View style = {styles.coins}>
                    <View style={{ flex:1 }}></View>
                    <Text style = {{ flex : 1, height : 10, width : this.props.coinsvalue,
                      backgroundColor : 'yellow', justifyContent:'flex-end' }} >coins</Text>

                    </View>

              </View>
            </View>

            </View>

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getcharacterinfo : (health, point, coin, level) => dispatch(fetchCharacterInfo(health, point, coin, level)),
  };
};

const mapStateToProps = (state) => {

  return {
    healthvalue : state.healthvalue,
    pointsvalue : state.pointsvalue,
    coinsvalue : state.coinsvalue,
    level : state.level,
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(Characterinfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width : '100%',
    height : '50%',
  },
  navBar: {
    height: 60,
    backgroundColor: '#FF6E40',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  body: {
    flex: 1,
    flexDirection: 'row',

  },
  left: {
    flex: 1,
    backgroundColor: 'white',
    marginRight : 10,
  },
  image : {
    flex : 3,
    width: '100%',
    height: 100,
    resizeMode:'contain',
    backgroundColor : 'transparent',

  },
  level : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  levelText : {
    fontSize : 20,

  },
  right: {
    flex: 2,
    flexDirection: 'column',
     // backgroundColor: 'transparent',
    // alignItems : 'center',//가로 가운데
    justifyContent : 'space-around', // 세로 아래로 정렬 왜 안돼?
  },

  health : {
    flex: 1,
        // height : 30,
        // flexDirection : 'row',
        // justifyContent : 'flex-end',
        // alignItems : 'flex-end'

  },
  healthbar : {
    flex : 1,
       // heigth : 20,
       // width : 100,
    backgroundColor : 'yellow',
  },
  points : {
    flex : 1,
      //  height : 30

  },
    // pointsbar : {
    //     flex : 1,
    //     heigth : 5,
    //     width : 20,
    //     backgroundColor : 'yellow'
    // },
  coins : {
    flex : 1,
      //  heigth: 30
  },
    // coinsbar : {
    //     flex : 1,
    //     heigth : 5,
    //     width : 20,
    //     backgroundColor : 'yellow'
    // },
  healthText : {
    flex : 1,
    justifyContent : 'flex-end',
  },
  pointsText : {
    flex : 1,
  },
  coinsText : {
    flex : 1,
  },

});
