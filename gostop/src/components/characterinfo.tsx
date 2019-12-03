import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCharacterInfo } from '../actions/characterinfoaction';

interface CharacterinfoProps {
  name : string;
  level : number;
  healthvalue : number;
  pointsvalue : number;
  coinsvalue : number;
  head : string;
  top : string;
  bottom : string;
  getcharacterinfo(name : string, health : number, point : number, coin : number, level : number): void;
}

class Characterinfo  extends React.Component<CharacterinfoProps, any> {
  constructor(props) {
    super(props);
  }

  public render() {
    const levelpoint = 200 + 50 * (this.props.level - 1);
    const pointbar = (this.props.pointsvalue / levelpoint) * 220;
    const healthbar = (this.props.healthvalue / 200) * 220;
    return (

      <View style={styles.container}>

      {/* <View style={styles.body}> */}
        <View style={styles.left}>
          <View style = {styles.character}>
            <Image
            style={styles.headimg}
            source={{ uri: this.props.head }}/>
            <Image
            style={styles.topimg}
            source={{ uri: this.props.top }}/>
            <Image
            style={styles.pantimg}
            source={{ uri: this.props.bottom }}/>
          </View>
          {/* <View style={styles.name}><Text>{this.props.name}</Text></View> */}
          <Text style={styles.level}>lv.{this.props.level}</Text>

        </View>

        <View style={styles.right}>
          <Text style={styles.name}>{this.props.name}</Text>
            {/* <View style={{ flex:1, width : 50, alignSelf : 'flex-end' }}>
              <View>
            <Text onPress={() => console.log('share Button pressed')} style = {{ color : '#ffdc34' }}>
              kakao</Text></View>
            </View> */}

            <View style = {styles.health}>
              <View style = {{ flex : 1, width : 220, backgroundColor : '#BE5C5C'}}>
                <View style = {{ flex : 1, width : healthbar || 0 ,
                  backgroundColor : '#c72c41', justifyContent:'flex-end' }}></View>
              </View>
              <View style = {{ flex : 2, flexDirection : 'row', justifyContent : 'space-between' }}>
                <Text style = {{ color :  'white' }}>{this.props.healthvalue} / 200</Text>
                <Text style = {{ color :  'white' }}>Health</Text>
              </View>
            </View>

            <View style = {styles.health}>
            <View style = {{ flex : 1, width : 220, backgroundColor : '#FFFF96'}}>
              <View style = {{ flex : 1,  width : pointbar || 0,
                backgroundColor : '#ffdc34', justifyContent:'flex-end' }}></View>
            </View>
                <View style = {{ flex : 2, flexDirection : 'row', justifyContent : 'space-between' }}>
                  <Text style = {{ color :  'white' }}>{this.props.pointsvalue} / {levelpoint}</Text>
                  <Text style = {{ color :  'white' }}>Experience</Text>
              </View>
            </View>

            <View style = {styles.coins}>
              <View style={{ flex:1, flexDirection : 'row' }}>
              <Image
              style={{ width: 20, height: 20 }}
              source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
              <Text style = {{ flex : 1, height : 20, color :  'white' }} >  {this.props.coinsvalue}</Text>
              </View>
            </View>

        </View>
      {/* </View> */}

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
    head : state.changeReducer.uri,
    top : state.changeReducer1.uri1,
    bottom : state.changeReducer2.uri2,
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
    // borderWidth: 1,
    // borderEndWidth : 1,
    // borderColor: '#ffdc34',
    backgroundColor : '#110133',
    flexDirection: 'row',
    width : '100%',
  },
  left: {
    borderWidth: 2,
    borderColor: '#ffdc34',
    flex: 1,
    backgroundColor : 'transparent',
    justifyContent : 'space-around',
    marginLeft : 17,
    height : '90%',
  },
  character : {
    flex : 8.7,
    backgroundColor: 'white',
    paddingTop : 5,
  },
  headimg : {
    flex : 4.5,
    width: '100%',
    resizeMode:'contain',
  },
  topimg : {
    flex : 3,
    width: '100%',
    resizeMode:'contain',
  },
  pantimg : {
    flex : 1.8,
    width : '100%',
    resizeMode: 'contain',
    alignSelf : 'center',

  },
  level : {
    flex : 1.3,
    alignSelf : 'center',
    color : '#ffdc34',
    // marginBottom : 2,
    fontSize : 13,
    paddingBottom : 2,
  },
  levelText : {

  },
  right: {
    flex: 2,
    flexDirection: 'column',
    // justifyContent : 'flex-end',
    marginLeft : 17,
    // marginBottom : 2,
    height : '90%',
  },
  name : {
    flex : 2.2,
    color : 'white',
    fontSize : 20,
    fontWeight: 'bold',
    marginTop : 5,
  },

  health : {
    flex: 2,
    width : 220,
  },

  coins : {
    flex : 1,
    paddingBottom : 2,
  },
  healthText : {
    flex : 1,
    color : 'white',
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
