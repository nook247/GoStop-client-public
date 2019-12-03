import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
          console.log(this.state.database);
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
  }
  // public sendHead = (newuri) => {
  //   // tslint:disable-next-line: prefer-const
  //   // tslint:disable-next-line: no-unused-expression
  //   fetch(`{fakeserver}/items`, {
  //     method: 'POST',
  //     body: JSON.stringify({ uri: newuri }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(res => res.json())
  //   .then(res => console.log('성공: ', JSON.stringify(res)))
  //   .catch(err => console.error(err));
  // }

  // public sendTop = (newuri) => {
  //   // tslint:disable-next-line: prefer-const
  //   // tslint:disable-next-line: no-unused-expression
  //   fetch(`{fakeserver}/items`, {
  //     method: 'POST',
  //     body: JSON.stringify({ uri: newuri }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(res => res.json())
  //   .then(res => console.log('성공: ', JSON.stringify(res)))
  //   .catch(err => console.error(err));
  // }

  // public sendPants = (newuri) => {
  //   // tslint:disable-next-line: prefer-const
  //   // tslint:disable-next-line: no-unused-expression
  //   fetch(`{fakeserver}/items`, {
  //     method: 'POST',
  //     body: JSON.stringify({ uri: newuri }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(res => res.json())
  //   .then(res => console.log('성공: ', JSON.stringify(res)))
  //   .catch(err => console.error(err));
  // }

  public render() {
    return (
          <View style={s.contain}>
              <View style ={{ flex : 7 }}>
                <Characterinfo/>
              </View>

            {/* <Image
            style={{ marginLeft: '10%', height:'4%', width:'15%', resizeMode:'contain' }}
            source={{ uri: this.props.uri }}/>
            <Image
            style={{ marginLeft: '9%', height:'8%', width:'19%', resizeMode:'contain' }}
            source={{ uri: this.props.uri1 }}/>
            <Image
            style={{ marginLeft: '8%', height:'11%', width:'22%', resizeMode:'contain' }}
            source={{ uri: this.props.uri2 }}/>
             */}
             <View style ={{ flex : 23.5 }}>
          <Text style={s.head1}>머리</Text>
          <View style={s.container}>

          {/* {this.state.database.map((head, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
            return <Image style={s.pink} source={{ uri: head.itemImg }} key={index}/>
          })} */}
          <View style={s.container1}>
            <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head6.png' }}/>
            <TouchableOpacity
              // tslint:disable-next-line: brace-style
              onPress = {() => { this.props.coinchange(-50),
              // tslint:disable-next-line: brace-style
              this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head6.png'); } }>
              <View style={s.buymain}>
              <Image
              style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
              <Text>X50</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={s.container1}>
            <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head7.png' }}/>
            <TouchableOpacity
              // tslint:disable-next-line: brace-style
              onPress = {() => { this.props.coinchange(-70),
              // tslint:disable-next-line: brace-style
              this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head7.png'); } }>
              <View style={s.buymain}>
              <Image
              style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
              <Text>X70</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={s.container1}>
            <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head8.png' }}/>

            <TouchableOpacity
              // tslint:disable-next-line: brace-style
              onPress = {() => { this.props.coinchange(-90),
              // tslint:disable-next-line: brace-style
              this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head8.png'); } }>
              <View style={s.buymain}>
              <Image
              style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
              <Text>X90</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={s.container1}>
            <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head9.png' }}/>
              <TouchableOpacity
              // tslint:disable-next-line: brace-style
              onPress = {() => { this.props.coinchange(-110),
              // tslint:disable-next-line: brace-style
              this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head9.png'); } }>
              <View style={s.buymain}>
              <Image
              style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
              <Text>X110</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={s.container1}>
            <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head10.png' }}/>
              <TouchableOpacity
              // tslint:disable-next-line: brace-style
              onPress = {() => { this.props.coinchange(-130),
              // tslint:disable-next-line: brace-style
              this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head10.png'); } }>
              <View style={s.buymain}>
              <Image
              style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
              <Text>X130</Text>
              </View>
            </TouchableOpacity>
          </View>

          </View>

          <Text style={s.head}>상의</Text>
          <View style={s.container}>

              <View style={s.container1}>
                <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top2.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-50),
                  // tslint:disable-next-line: brace-style
                  this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top2.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X50</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={s.container1}>
                <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top3.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-70),
                  // tslint:disable-next-line: brace-style
                  this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top3.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X70</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={s.container1}>
                <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top4.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-90),
                  // tslint:disable-next-line: brace-style
                  this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top4.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X90</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={s.container1}>
                <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top5.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-110),
                  // tslint:disable-next-line: brace-style
                  this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top5.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X110</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={s.container1}>
                <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top6.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-130),
                  // tslint:disable-next-line: brace-style
                  this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top6.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X130</Text>
                  </View>
                </TouchableOpacity>
              </View>

          </View>

          <Text style={s.head}>하의</Text>
          <View style={s.container}>

            <View style={s.container1}>
             <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm2.png' }}/>
              <TouchableOpacity
                // tslint:disable-next-line: brace-style
                onPress = {() => { this.props.coinchange(-50),
                // tslint:disable-next-line: brace-style
                this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm2.png'); } }>
                <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X50</Text>
                  </View>
              </TouchableOpacity>
            </View>

            <View style={s.container1}>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm3.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-70),
                  // tslint:disable-next-line: brace-style
                  this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm3.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X70</Text>
                  </View>
                </TouchableOpacity>
            </View>

            <View style={s.container1}>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom4.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-90),
                  // tslint:disable-next-line: brace-style
                  this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom4.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X90</Text>
                  </View>
                </TouchableOpacity>
            </View>

            <View style={s.container1}>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom5.png' }}/>
                <TouchableOpacity
                  // tslint:disable-next-line: brace-style
                  onPress = {() => { this.props.coinchange(-110),
                  // tslint:disable-next-line: brace-style
                  this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom5.png'); } }>
                  <View style={s.buymain}>
                  <Image
                  style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
                  <Text>X110</Text>
                  </View>
                </TouchableOpacity>
            </View>

            <View style={s.container1}>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom6.png' }}/>
                <TouchableOpacity
                // tslint:disable-next-line: brace-style
                onPress = {() => { this.props.coinchange(-130),
                // tslint:disable-next-line: brace-style
                this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom6.png'); } }>
                <View style={s.buymain}>
              <Image
              style={s.buy} source={{ uri: 'https://cdn.pixabay.com/photo/2019/06/16/16/07/money-4278155_960_720.png' }}/>
              <Text>X130</Text>
              </View>
                </TouchableOpacity>
            </View>

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
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'column',
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
  green: {
    marginLeft: 25,
    backgroundColor: 'green',
    padding: 4,
    marginTop: 5,
    alignItems: 'center',
  },
  buymain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  buy: {
    resizeMode:'contain',
    marginLeft: 25,
    width: 18,
    height: 20,
  },
  head: {
    marginLeft: 25,
    marginTop: 20,
  },
  head1: {
    marginLeft: 25,
    marginTop: 40,
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
