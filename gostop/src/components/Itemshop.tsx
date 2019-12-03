import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { additem, additem1, additem2, imagechange, imagechange1, imagechange2 } from '../actions/';
import { coinchange } from '../actions/characterinfoaction';
import Characterinfo from '../components/characterinfo';
import fakeserver from '../fakeserver';

// tslint:disable-next-line: prefer-const
let database;

class Itemshop extends Component<any, any> {

  // tslint:disable-next-line: member-access
  constructor(props, context) {
    super(props, context);
  }

  // public componentDidMount() {
  //   fetch(`${fakeserver}/items`).then((res) => {
  //     if (res.status === 200 || res.status === 201) {
  //       // tslint:disable-next-line: ter-arrow-parens
  //       res.json().then(data => {
  //         database = data;
  //         // console.log(database[1]);
  //       });
        
  //     }else {
  //       console.error(res.statusText);
  //     }
  //   }).catch(err => console.error(err));
  // }
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
              <View style ={{ flex : 5 }}>
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
          <Text style={s.head1}>머리</Text>
          <View style={s.container}>

          {/* {database.map((head, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              return <Image style={s.pink} source={{ uri: head.itemImg }} key={index}/>
            })} */}

              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head2.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head3.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head4.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head5.png' }}/>
          </View>

          <View style={s.container}>
          <TouchableOpacity style={s.green}

          // // tslint:disable-next-line: brace-style
          // onPress = {() => { this.props.coinchange(-5),
          // // tslint:disable-next-line: brace-style
          // this.sendHead('https://totalitems.s3.ap-northeast-2.amazonaws.com/head2.png'); } }>
          //     <Text style={{ fontSize: 15 }}>구매</Text>

              // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-50),
          // tslint:disable-next-line: brace-style
          this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head2.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>

            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-70),
          // tslint:disable-next-line: brace-style
          this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head3.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-90),
          // tslint:disable-next-line: brace-style
          this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head4.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>

          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-110),
          // tslint:disable-next-line: brace-style
          this.props.additem('https://totalitems.s3.ap-northeast-2.amazonaws.com/head5.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>상의</Text>
          <View style={s.container}>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top2.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top3.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top4.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top5.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top6.png' }}/>
          </View>

          <View style={s.container}>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-50),
          // tslint:disable-next-line: brace-style
          this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top2.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-70),
          // tslint:disable-next-line: brace-style
          this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top3.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-90),
          // tslint:disable-next-line: brace-style
          this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top4.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-110),
          // tslint:disable-next-line: brace-style
          this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top5.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-130),
          // tslint:disable-next-line: brace-style
          this.props.additem1('https://totalitems.s3.ap-northeast-2.amazonaws.com/top6.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>하의</Text>
          <View style={s.container}>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm2.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm3.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom4.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom5.png' }}/>
              <Image style={s.pink} source={{ uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom6.png' }}/>
          </View>

          <View style={s.container}>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-5),
          // tslint:disable-next-line: brace-style
          this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm2.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-10),
          // tslint:disable-next-line: brace-style
          this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm3.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-15),
          // tslint:disable-next-line: brace-style
          this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom4.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-20),
          // tslint:disable-next-line: brace-style
          this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom5.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-20),
          // tslint:disable-next-line: brace-style
          this.props.additem2('https://totalitems.s3.ap-northeast-2.amazonaws.com/bottom6.png'); } }>
              <Text style={{ fontSize: 14 }}>구매</Text>
            </TouchableOpacity>
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
  },
  green: {
    marginLeft: 35,
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 10,
    marginTop: -15,
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
    additem : (uri3: any) => dispatch(additem(uri3)),
    additem1 : (uri4: any) => dispatch(additem1(uri4)),
    additem2 : (uri5: any) => dispatch(additem2(uri5)),
  };
};

function mapStateToProps(state) {
  return {
    uri: state.changeReducer.uri,
    uri1: state.changeReducer1.uri1,
    uri2: state.changeReducer2.uri2,
    coinsvalue : state.changepointreducer.coinsvalue,
    uri3: state.additem.uri3,
    uri4: state.additem1.uri4,
    uri5: state.additem2.uri5,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Itemshop);
