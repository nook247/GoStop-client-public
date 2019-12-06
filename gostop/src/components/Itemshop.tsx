import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { additem, additem1, additem2, imagechange, imagechange1, imagechange2 } from '../actions/';
import { coinchange } from '../actions/characterinfoaction';
import Characterinfo from '../components/characterinfo';
import fakeserver from '../fakeserver';

// tslint:disable-next-line: prefer-const

class Itemshop extends Component<any, any> {

  // tslint:disable-next-line: member-access
  constructor(props, context) {
    super(props, context);

    this.state = {
      database: [],
    };
  }

  public componentDidMount() {
    fetch(`${fakeserver}/items`).then((res) => {
      if (res.status === 200 || res.status === 201) {
        // tslint:disable-next-line: ter-arrow-parens
        res.json().then(data => {
          this.setState({
            database: data,
          });
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
  }

  public sendItem = async(itemid) => {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-unused-expression
    let token = '';
    await AsyncStorage.getItem('token', (err, result) => {
      token = result;
    });
    // tslint:disable-next-line: prefer-const
    let header = new Headers();
    header.append('Cookie', token);
    header.append('Content-Type', 'application/json');

    // tslint:disable-next-line: prefer-const
    let myInit = {
      method : 'POST',
      body: JSON.stringify(itemid),
      headers : header,
      Cookie : token,
    };

    fetch(`${fakeserver}/shop`, myInit)
    .then(() => console.log('포스트 성공'))
    .catch(err => console.error(err));
  }

  public render() {
    return (
          <View style={s.contain}>
              <View style ={{ flex : 7 }}>
                <Characterinfo/>
              </View>

             <View style ={{ flex : 23.5 }}>
          <Text style={s.head1}>머리</Text>
          <View style={s.container}>

          {this.state.database.map((head, index) => {
            if (head.category === 'head') {
              return <View style={s.container1} key={index}>
              <Image style={s.pink} source={{ uri: head.itemImg }}/>
              <TouchableOpacity
                // tslint:disable-next-line: brace-style
                onPress = {() => {
                  Alert.alert(
                    '구매하시겠습니까?',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        if (head.price < this.props.hascoinsvalue) {
                          this.props.coinchange(-head.price),
                          // tslint:disable-next-line: brace-style
                          this.props.additem(head.itemImg),
                          this.sendItem({ item: head._id, totalPrice: head.price, payment: 'coin' });
                        }
                        // tslint:disable-next-line: brace-style
                        else {
                          Alert.alert(
                            '코인이 부족합니다.',
                            '',
                            [
                              { text: 'OK', onPress: () => { console.log('OK Pressed'); } },
                            ],
                          );
                        }
                      },
                      },
                    ],
                    { cancelable: false },

                  // tslint:disable-next-line: brace-style
                  ); } }>
                <View style={s.buymain}>
                <Image
                style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                <Text>X{head.price}</Text>
                </View>
              </TouchableOpacity>
            </View>;
            }
          })}

          </View>

          <Text style={s.head}>상의</Text>
          <View style={s.container}>

          {this.state.database.map((top, index) => {
            if (top.category === 'top') {
              return <View style={s.container1} key={index}>
              <Image style={s.pink} source={{ uri: top.itemImg }}/>
              <TouchableOpacity
                // tslint:disable-next-line: brace-style
                onPress = {() => {
                  Alert.alert(
                    '구매하시겠습니까?',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        if (top.price < this.props.hascoinsvalue) {
                          this.props.coinchange(-top.price),
                          // tslint:disable-next-line: brace-style
                          this.props.additem1(top.itemImg),
                          this.sendItem({ item: top._id, totalPrice: top.price, payment: 'coin' });
                        }
                        // tslint:disable-next-line: brace-style
                        else {
                          Alert.alert(
                            '코인이 부족합니다.',
                            '',
                            [
                              { text: 'OK', onPress: () => { console.log('OK Pressed'); } },
                            ],
                          );
                        }
                      },
                      },
                    ],
                    { cancelable: false },

                  // tslint:disable-next-line: brace-style
                  ); } }>
                <View style={s.buymain}>
                <Image
                style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                <Text>X{top.price}</Text>
                </View>
              </TouchableOpacity>
            </View>;
            }
          })}

          </View>

          <Text style={s.head}>하의</Text>
          <View style={s.container}>

          {this.state.database.map((bottom, index) => {
            if (bottom.category === 'bottom') {
              return <View style={s.container1} key={index}>
              <Image style={s.pink} source={{ uri: bottom.itemImg }}/>
              <TouchableOpacity
                // tslint:disable-next-line: brace-style
                onPress = {() => {
                  Alert.alert(
                    '구매하시겠습니까?',
                    '',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {
                        if (bottom.price < this.props.hascoinsvalue) {
                          this.props.coinchange(-bottom.price),
                          // tslint:disable-next-line: brace-style
                          this.props.additem2(bottom.itemImg),
                          this.sendItem({ item: bottom._id, totalPrice: bottom.price, payment: 'coin' });
                        }
                        // tslint:disable-next-line: brace-style
                        else {
                          Alert.alert(
                            '코인이 부족합니다.',
                            '',
                            [
                              { text: 'OK', onPress: () => { console.log('OK Pressed'); } },
                            ],
                          );
                        }
                      },
                      },
                    ],
                    { cancelable: false },

                  // tslint:disable-next-line: brace-style
                  ); } }>
                <View style={s.buymain}>
                <Image
                style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                <Text>X{bottom.price}</Text>
                </View>
              </TouchableOpacity>
            </View>;
            }
          })}

          </View>
          </View>
          </View>
    );
  }
}

const s = StyleSheet.create({
  contain:{
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    width : '100%',
  },
  container: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container1: {
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pink: {
    padding: 20,
    height: 30,
    resizeMode:'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buymain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
    justifyContent: 'center',
  },
  buy: {
    resizeMode:'contain',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    marginLeft: 25,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    width: '90%',
  },
  head1: {
    marginLeft: 25,
    marginTop: 40,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    width: '90%',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    // tslint:disable-next-line: no-shadowed-variable
    imagechange : (uri: any) => dispatch(imagechange(uri)),
    imagechange1 : (uri1: any) => dispatch(imagechange1(uri1)),
    imagechange2 : (uri2: any) => dispatch(imagechange2(uri2)),
    coinchange : value => dispatch(coinchange(value)),
    additem : (heads: any) => dispatch(additem(heads)),
    additem1 : (tops: any) => dispatch(additem1(tops)),
    additem2 : (pantss: any) => dispatch(additem2(pantss)),
  };
};

function mapStateToProps(state) {
  return {
    uri: state.changeReducer.uri,
    uri1: state.changeReducer1.uri1,
    uri2: state.changeReducer2.uri2,
    coinsvalue : state.changepointreducer.coinsvalue,
    heads: state.additem.heads,
    tops: state.additem1.tops,
    pantss: state.additem2.pantss,
    hascoinsvalue : state.getuserreducer.coin,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Itemshop);
