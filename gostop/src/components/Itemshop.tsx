import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { imagechange, imagechange1, imagechange2, imagechange3 } from '../actions';
import { coinchange } from '../actions/characterinfoaction';

// tslint:disable-next-line: prefer-const
let database;

class Main extends Component<any, any> {

  // tslint:disable-next-line: member-access
  constructor(props, context) {
    super(props, context);
  }

  // public componentDidMount() {
  //   fetch('https://application-mock-server.localtunnel.me/head').then((res) => {
  //     if (res.status === 200 || res.status === 201) {
  //       // tslint:disable-next-line: ter-arrow-parens
  //       res.json().then(data => {
  //         database = data;
  //       });
  //     }else {
  //       console.error(res.statusText);
  //     }
  //   }).catch(err => console.error(err));
  // }
  public sendHead = (newuri) => {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-unused-expression
    fetch('https://application-mock-server.localtunnel.me/head', {
      method: 'POST',
      body: JSON.stringify({ uri: newuri }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(res => console.log('성공: ', JSON.stringify(res)))
    .catch(err => console.error(err));
  }

  public sendTop = (newuri) => {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-unused-expression
    fetch('https://application-mock-server.localtunnel.me/top', {
      method: 'POST',
      body: JSON.stringify({ uri: newuri }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(res => console.log('성공: ', JSON.stringify(res)))
    .catch(err => console.error(err));
  }

  public sendPants = (newuri) => {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-unused-expression
    fetch('https://application-mock-server.localtunnel.me/pants', {
      method: 'POST',
      body: JSON.stringify({ uri: newuri }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(res => console.log('성공: ', JSON.stringify(res)))
    .catch(err => console.error(err));
  }

  public sendPet = (newuri) => {
    // tslint:disable-next-line: prefer-const
    // tslint:disable-next-line: no-unused-expression
    fetch('https://application-mock-server.localtunnel.me/pet', {
      method: 'POST',
      body: JSON.stringify({ uri: newuri }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then(res => console.log('성공: ', JSON.stringify(res)))
    .catch(err => console.error(err));
  }

  public render() {
    return (
          <View style={s.contain}>
            {/* <Image
            style={{ marginLeft: '10%', height:'4%', width:'15%', resizeMode:'contain' }}
            source={{ uri: this.props.uri }}/>
            <Image
            style={{ marginLeft: '9%', height:'8%', width:'19%', resizeMode:'contain' }}
            source={{ uri: this.props.uri1 }}/>
            <Image
            style={{ marginLeft: '8%', height:'11%', width:'22%', resizeMode:'contain' }}
            source={{ uri: this.props.uri2 }}/>
            <Image
            style={{ marginLeft: '8%', height:'12%', width:'23%', resizeMode:'contain' }}
            source={{ uri: this.props.uri3 }}/> */}
          <Text style={s.head1}>머리</Text>
          <View style={s.container}>
              <Text style={s.pink}>분홍색</Text>
              <Text style={s.purple}>보라색</Text>
              <Text style={s.brown}>진갈색</Text>
              <Text style={s.black}>검은색</Text>
          </View>

          <View style={s.container}>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-5),
          // tslint:disable-next-line: brace-style
          this.sendHead('http://pngimg.com/uploads/headphones/headphones_PNG7654.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green1}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-10),
          // tslint:disable-next-line: brace-style
          this.sendHead('http://pngimg.com/uploads/butterfly/butterfly_PNG1056.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green2}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-15),
          // tslint:disable-next-line: brace-style
          this.sendHead('http://pngimg.com/uploads/book/book_PNG2111.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
          <TouchableOpacity style={s.green3}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-20),
          // tslint:disable-next-line: brace-style
          this.sendHead('http://pngimg.com/uploads/cap/cap_PNG5681.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>상의</Text>
          <View style={s.container}>
              <Text style={s.pink}>분홍색</Text>
              <Text style={s.purple}>보라색</Text>
              <Text style={s.brown}>진갈색</Text>
              <Text style={s.black}>검은색</Text>
          </View>

          <View style={s.container}>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-5),
          // tslint:disable-next-line: brace-style
          this.sendTop('http://pngimg.com/uploads/polo_shirt/polo_shirt_PNG8171.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green1}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-10),
          // tslint:disable-next-line: brace-style
          this.sendTop('http://pngimg.com/uploads/diamond/diamond_PNG6683.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green2}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-15),
          // tslint:disable-next-line: brace-style
          this.sendTop('http://pngimg.com/uploads/bmw/bmw_PNG1711.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
          <TouchableOpacity style={s.green3}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-20),
          // tslint:disable-next-line: brace-style
          this.sendTop('http://pngimg.com/uploads/men_in_black/men_in_black_PNG27.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>하의</Text>
          <View style={s.container}>
              <Text style={s.pink}>분홍색</Text>
              <Text style={s.purple}>보라색</Text>
              <Text style={s.brown}>진갈색</Text>
              <Text style={s.black}>검은색</Text>
          </View>

          <View style={s.container}>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-5),
          // tslint:disable-next-line: brace-style
          this.sendPants('http://pngimg.com/uploads/cap/cap_PNG5681.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green1}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-10),
          // tslint:disable-next-line: brace-style
          this.sendPants('http://pngimg.com/uploads/women_shoes/women_shoes_PNG7474.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green2}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-15),
          // tslint:disable-next-line: brace-style
          this.sendPants('http://pngimg.com/uploads/balloon/balloon_PNG3402.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
          <TouchableOpacity style={s.green3}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-20),
          // tslint:disable-next-line: brace-style
          this.sendPants('http://pngimg.com/uploads/boots/boots_PNG7809.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>펫</Text>
          <View style={s.container}>
              <Text style={s.pet1}>캐터피</Text>
              <Text style={s.pet2}>드래곤</Text>
              <Text style={s.pet2}>강아지</Text>
          </View>

          <View style={s.container}>
          <TouchableOpacity style={s.green}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-5),
          // tslint:disable-next-line: brace-style
          this.sendPet('http://pngimg.com/uploads/caterpillar/caterpillar_PNG77.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green1}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-10),
          // tslint:disable-next-line: brace-style
          this.sendPet('http://pngimg.com/uploads/dragon/dragon_PNG84563.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.green2}
          // tslint:disable-next-line: brace-style
          onPress = {() => { this.props.coinchange(-15),
          // tslint:disable-next-line: brace-style
          this.sendPet('http://pngimg.com/uploads/dog/dog_PNG50361.png'); } }>
              <Text style={{ fontSize: 15 }}>구매</Text>
            </TouchableOpacity>
          </View>

          </View>
    );
  }
}

const s = StyleSheet.create({
  contain:{
    marginTop: 30,
  },
  container: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pink: {
    marginLeft: 10,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
  },
  purple: {
    marginLeft: 30,
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
  },
  brown: {
    marginLeft: 30,
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
  },
  green: {
    marginLeft: 17,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginTop: -17,
  },
  green1: {
    marginLeft: 43,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginTop: -17,
  },
  green2: {
    marginLeft: 43,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginTop: -17,
  },
  green3: {
    marginLeft: 43,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginTop: -17,
  },
  black: {
    marginLeft: 30,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
  },
  head: {
    marginLeft: 15,
  },
  head1: {
    marginLeft: 15,
    marginTop: 60,
  },
  pet1: {
    marginLeft: 10,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 20,
  },
  pet2: {
    marginLeft: 30,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 20,
  },
  pet3: {
    marginLeft: 30,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 20,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    // tslint:disable-next-line: no-shadowed-variable
    imagechange : (uri: any) => dispatch(imagechange(uri)),
    imagechange1 : (uri1: any) => dispatch(imagechange1(uri1)),
    imagechange2 : (uri2: any) => dispatch(imagechange2(uri2)),
    imagechange3 : (uri3: any) => dispatch(imagechange3(uri3)),
    coinchange : value => dispatch(coinchange(value)),
  };
};

function mapStateToProps(state) {
  return {
    uri: state.changeReducer.uri,
    uri1: state.changeReducer1.uri1,
    uri2: state.changeReducer2.uri2,
    uri3: state.changeReducer3.uri3,
    coinsvalue : state.changepointreducer.coinsvalue,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
