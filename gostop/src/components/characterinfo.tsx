import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCharacterInfo } from '../actions/characterinfoaction';

interface CharacterinfoProps {
  name : string;
  level : number;
  healthvalue : number;
  pointsvalue : number;
  coinsvalue : number;
  getcharacterinfo(name : string, health : number, point : number, coin : number, level : number): void;
}

class Characterinfo  extends React.Component<CharacterinfoProps, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    const levelpoint = 200 + 50 * (this.props.level-1);
    const pointbar = (this.props.pointsvalue / levelpoint) * 200
    return (

            <View style={styles.container}>

            <View style={styles.body}>
              <View style={styles.left}>
                <Image
                style={styles.image}
                source={{ uri:'https://png.pngtree.com/png-clipart/20190630/original/pngtree-handsome-cartoon-dog-image-cute-dog-png-image_4180965.jpg' }}/>
                <Image
                style={styles.image}
                source={{ uri:'https://png.pngtree.com/png-clipart/20190630/original/pngtree-handsome-cartoon-dog-image-cute-dog-png-image_4180965.jpg' }}/>
                <Image
                style={styles.image}
                source={{ uri:'https://png.pngtree.com/png-clipart/20190630/original/pngtree-handsome-cartoon-dog-image-cute-dog-png-image_4180965.jpg' }}/>
                <View style={styles.level}><Text>{this.props.name}</Text></View>
                <View style={styles.level}><Text>level{this.props.level}</Text></View>
              </View>

              <View style={styles.right}>
               <View style={{ flex:1, width : 50, alignSelf : 'flex-end' }}>
                 <View>
               <Text onPress={() => console.log('share Button pressed')} style = {{ color : '#ffdc34' }}>
                 kakao</Text></View>
               </View>

                <View style = {styles.health}>
                
                  <Text style = {{ flex : 1, width : this.props.healthvalue || 0 ,
                    backgroundColor : '#c72c41', justifyContent:'flex-end' }}> </Text>
                  <Text style = {{ flex : 2, height :10, color :  'white',
                    justifyContent:'flex-end' }}>health {this.props.healthvalue} / 200 </Text>
                </View>

                <View style = {styles.points}>
                  <Text style = {{ flex : 1,  width : pointbar || 0,
                    backgroundColor : '#ffdc34', justifyContent:'flex-end' }}></Text>
                  <Text style = {{ flex : 2, height :10, color :  'white',
                    justifyContent:'flex-end' }}>points {this.props.pointsvalue} / {levelpoint} </Text>
                </View>

                <View style = {styles.coins}>
                  <View style={{ flex:1, flexDirection : 'row'}}>
                  <Image
                  style={{ width: 20, height: 20 }}
                  source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text style = {{ flex : 1, height : 20, color :  'white' }} >{this.props.coinsvalue}</Text>
                  </View>
                </View>

              </View>
            </View>

            </View>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.getuserreducer.name,
    healthvalue : state.getuserreducer.health,
    pointsvalue : state.getuserreducer.point,
    coinsvalue : state.getuserreducer.coin,
    level : state.getuserreducer.level,

  };

};

const mapDispatchToProps = dispatch => {
  return {
    getcharacterinfo : (name, health, point, coin, level) => dispatch(fetchCharacterInfo(name, health, point, coin, level)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Characterinfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderEndWidth : 1,
    borderColor: '#ffdc34',
    
    backgroundColor : '#110133',
    flexDirection: 'column',
    width : '100%',
  },
  body: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    flexDirection: 'row',

  },
  left: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    backgroundColor: 'white',
    marginRight : 10,
  },
  image : {
    borderWidth: 1,
    borderColor: 'black',
    flex : 3,
    width: '100%',
    height: 100,
    resizeMode:'contain',
    backgroundColor : 'transparent',

  },
  level : {
    borderWidth: 1,
    borderColor: 'black',
    flex : 1,
    marginTop : 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  levelText : {
    // fontSize : 10,

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
    color : 'white',
    // justifyContent : 'flex-end',
  },
  pointsText : {
    flex : 1,
    color : 'white',
  },
  coinsText : {
    flex : 1,
    color : 'white',
  },

});
