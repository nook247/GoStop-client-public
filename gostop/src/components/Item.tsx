import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { imagechange, imagechange1, imagechange2, imagechange3 } from '../actions/';

// tslint:disable-next-line: prefer-const
let database;

class Main extends Component<any, any> {

  constructor(props, context) {
    super(props, context);
  }

  public componentDidMount() {
    fetch('https://application-mock-server.localtunnel.me/items').then((res) => {
      if (res.status === 200 || res.status === 201) {
        // tslint:disable-next-line: ter-arrow-parens
        res.json().then(data => {
          database = data;
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
  }

  public render() {
    return (
          <View style={s.contain}>
            <Image
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
            source={{ uri: this.props.uri3 }}/>
          <Text style={s.head1}>머리</Text>
          <View style={s.container}>
            <TouchableOpacity style={s.red}
            onPress = {() => { this.props.imagechange(database.head[0].uri); }}>
              <Text style={{ fontSize: 15 }}>빨간색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.yellow}
            onPress = {() => { this.props.imagechange(database.head[1].uri); }}>
              <Text style={{ fontSize: 15 }}>노란색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.blue}
            onPress = {() => { this.props.imagechange(database.head[2].uri); }}>
              <Text style={{ fontSize: 15 }}>파란색</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>상의</Text>
          <View style={s.container}>
          <TouchableOpacity style={s.red}
            onPress = {() => { this.props.imagechange1(database.top[0].uri); }}>
              <Text style={{ fontSize: 15 }}>빨간색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.yellow}
            onPress = {() => { this.props.imagechange1(database.top[1].uri); }}>
              <Text style={{ fontSize: 15 }}>노란색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.blue}
            onPress = {() => { this.props.imagechange1(database.top[2].uri); }}>
              <Text style={{ fontSize: 15 }}>파란색</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>하의</Text>
          <View style={s.container}>
          <TouchableOpacity style={s.red}
            onPress = {() => { this.props.imagechange2(database.pants[0].uri); }}>
              <Text style={{ fontSize: 15 }}>빨간색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.yellow}
            onPress = {() => { this.props.imagechange2(database.pants[1].uri); }}>
              <Text style={{ fontSize: 15 }}>노란색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.blue}
            onPress = {() => { this.props.imagechange2(database.pants[2].uri); }}>
              <Text style={{ fontSize: 15 }}>파란색</Text>
            </TouchableOpacity>
          </View>

          <Text style={s.head}>펫</Text>
          <View style={s.container}>
          <TouchableOpacity style={s.pet1}
            onPress = {() => { this.props.imagechange3(database.pet[0].uri); }}>
              <Text style={{ fontSize: 15 }}>주황몬</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.pet2}
            onPress = {() => { this.props.imagechange3(database.pet[1].uri); }}>
              <Text style={{ fontSize: 15 }}>하얀몬</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.pet3}
            onPress = {() => { this.props.imagechange3(database.pet[2].uri); }}>
              <Text style={{ fontSize: 15 }}>파랑몬</Text>
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
  red: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
  },
  yellow: {
    marginLeft: 30,
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 20,
  },
  blue: {
    marginLeft: 30,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
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
  };
};

function mapStateToProps(state) {
  return {
    uri: state.changeReducer.uri,
    uri1: state.changeReducer1.uri1,
    uri2: state.changeReducer2.uri2,
    uri3: state.changeReducer3.uri3,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
