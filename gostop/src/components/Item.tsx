import React, { Component } from 'react';
import {  AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { imagechange, imagechange1, imagechange2 } from '../actions/';
import Characterinfo from '../components/characterinfo';
import fakeserver from '../fakeserver';

class Item extends Component<any, any, any> {

  constructor(props, context) {
    super(props, context);

    this.state = {
      database: {
        // tslint:disable-next-line: object-literal-key-quotes
        'hasItems': [
          {
            // tslint:disable-next-line: object-literal-key-quotes
            'item': {
              // tslint:disable-next-line: object-literal-key-quotes
              'category': '',
              // tslint:disable-next-line: object-literal-key-quotes
              'itemImg': '',
            },
          },
        ],
      },
    };

  }

  // tslint:disable-next-line: member-access
  async getdata() {
    let token = '';
    await AsyncStorage.getItem('token', (err, result) => {
      token = result;
    },
    );
    // tslint:disable-next-line: prefer-const
    let header = new Headers();
    header.append('Cookie', token);
    const myInit = {
      method : 'GET',
      headers : header,
      Cookie : token,
    };
    fetch(`${fakeserver}/users/hasItems`, myInit).then((res) => {
      // console.log(res);
      if (res.status === 200 || res.status === 201) {
        // tslint:disable-next-line: ter-arrow-parens
        res.json().then(data => {
          this.setState({ database: data });
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
  }
  public componentDidMount() {
    this.getdata();
  }

  public render() {

    return (
          <View style={s.contain}>
            <View style ={{ flex : 7 }}>
                <Characterinfo/>
              </View>

          <View style ={{ flex : 23.5 }}>
          <Text style={s.head1}>머리</Text>
          <View style={s.container} >

              {this.state.database.hasItems.map((element, index) => {
                            // tslint:disable-next-line: no-unused-expression
                if (element.item.category === 'head') {
                  return <TouchableOpacity key={index}
                          onPress = {() => { this.props.imagechange(element.item.itemImg); }}>
                           <Image key={index} style={s.pink} source={{ uri: element.item.itemImg }}/>
                         </TouchableOpacity>;
                }
              })}

            {this.props.heads.map((head, index) => {
              // tslint:disable-next-line: no-unused-expression

              return<TouchableOpacity key={index}
                            onPress = {() => { this.props.imagechange(head); }}>
                              <Image key={index} style={s.pink} source={{ uri: head }}/>
                            </TouchableOpacity>;

            })}

          </View>

          <Text style={s.head}>상의</Text>
          <View style={s.container}>

          {this.state.database.hasItems.map((element, index) => {
                            // tslint:disable-next-line: no-unused-expression
            if (element.item.category === 'top') {
              return <TouchableOpacity key={index}
                        onPress = {() => { this.props.imagechange(element.item.itemImg); }}>
                        <Image key={index} style={s.pink} source={{ uri: element.item.itemImg }}/>
                    </TouchableOpacity>;
            }
          })}

          {this.props.tops.map((top, index) => {
              // tslint:disable-next-line: no-unused-expression
            return <TouchableOpacity key={index}
              onPress = {() => { this.props.imagechange1(top); }}>
                <Image key={index} style={s.pink} source={{ uri: top }}/>
              </TouchableOpacity>;
          })}

          </View>

          <Text style={s.head}>하의</Text>
          <View style={s.container}>

          {this.state.database.hasItems.map((element, index) => {
                            // tslint:disable-next-line: no-unused-expression
            if (element.item.category === 'bottom') {
              return <TouchableOpacity key={index}
                        onPress = {() => { this.props.imagechange(element.item.itemImg); }}>
                        <Image key={index} style={s.pink} source={{ uri: element.item.itemImg }}/>
                    </TouchableOpacity>;
            }
          })}

          {this.props.pantss.map((pants, index) => {
              // tslint:disable-next-line: no-unused-expression
            return <TouchableOpacity key={index}
              onPress = {() => { this.props.imagechange2(pants); }}>
                <Image key={index} style={s.pink} source={{ uri: pants }}/>
              </TouchableOpacity>;
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
  pink: {
    marginLeft: 25,
    backgroundColor: 'white',
    padding: 20,
    height: 30,
    width: 50,
    resizeMode:'contain',
    alignItems: 'center',
  },
  red: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  head: {
    marginLeft: 25,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    width: '80%',
  },
  head1: {
    marginLeft: 25,
    marginTop: 70,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    width: '80%',
  },

});

const mapDispatchToProps = (dispatch) => {
  return {
    // tslint:disable-next-line: no-shadowed-variable
    imagechange : (uri: any) => dispatch(imagechange(uri)),
    imagechange1 : (uri1: any) => dispatch(imagechange1(uri1)),
    imagechange2 : (uri2: any) => dispatch(imagechange2(uri2)),
  };
};

function mapStateToProps(state) {
  return {
    uri: state.changeReducer.uri,
    uri1: state.changeReducer1.uri1,
    uri2: state.changeReducer2.uri2,
    heads: state.additem.heads,
    tops: state.additem1.tops,
    pantss: state.additem2.pantss,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
