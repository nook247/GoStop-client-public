import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { imagechange, imagechange1, imagechange2, imagechange3 } from '../Actions/';

// tslint:disable-next-line: prefer-const
let database;

class Main extends Component<any, any> {

  constructor(props, context) {
    super(props, context);

    // console.log(this.props.uri1);
    this.state = {
      heads: [],
      tops: [],
      pantss: [],
      pets: [],
    };
  }

  public componentDidMount() {
    fetch('https://application-mock-server.localtunnel.meitems').then((res) => {
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        // tslint:disable-next-line: ter-arrow-parens
        res.json().then(data => {
          console.log(data);
          this.setState({ heads: data });
          // console.log(this.state);
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));

    fetch('https://application-mock-server.localtunnel.meitems').then((res) => {
      if (res.status === 200 || res.status === 201) {
        // tslint:disable-next-line: ter-arrow-parens
        res.json().then(data => {
          console.log(data);
          this.setState({ tops: data });
          // console.log(this.state);
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));

    fetch('https://application-mock-server.localtunnel.meitems').then((res) => {
      if (res.status === 200 || res.status === 201) {
        // tslint:disable-next-line: ter-arrow-parens
        res.json().then(data => {
          console.log(data);
          this.setState({ pantss: data });
          // console.log(this.state);
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));

    fetch('https://application-mock-server.localtunnel.meitems').then((res) => {
      if (res.status === 200 || res.status === 201) {
        // tslint:disable-next-line: ter-arrow-parens
        res.json().then(data => {
          console.log(data);
          this.setState({ pets: data });
          // console.log(this.state);
        });
      }else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
  }

  public render() {

            // // tslint:disable-next-line: ter-indent
            // const heads = database.map((head) => {
            //   // tslint:disable-next-line: no-unused-expression
            //   <TouchableOpacity style={s.red}
            //   onPress = {() => { this.props.imagechange(head.uri); }}>
            //     <Text style={{ fontSize: 15 }}>빨간색</Text>
            //   </TouchableOpacity>;
            // });
    return (
          <View style={s.contain}>
            {/* {console.log(this.props.uri)} */}
            <Image
            style={s.basichead}
            source={{ uri: this.props.uri }}/>
            <Image
            style={s.basictop}
            source={{ uri: this.props.uri1 }}/>
            <Image
            style={s.basicpants}
            source={{ uri: this.props.uri2 }}/>
            <Image
            style={s.basicpet}
            source={{ uri: this.props.uri3 }}/>
          <Text style={s.head1}>머리</Text>
          <View style={s.container} >

            {this.state.heads.map((head, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              // console.log(head.uri);
              return <TouchableOpacity style={s.red} key={index}
              onPress = {() => { this.props.imagechange(head.uri); }}>
                <Text style={{ fontSize: 15 }}>빨간색</Text>
              </TouchableOpacity>;
            })}

            {/* {heads} */}
            {/* <TouchableOpacity style={s.red}
            onPress = {() => { this.props.imagechange(database.uri); }}>
              <Text style={{ fontSize: 15 }}>빨간색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.yellow}
            onPress = {() => { this.props.imagechange(database.head[1].uri); }}>
              <Text style={{ fontSize: 15 }}>노란색</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.blue}
            onPress = {() => { this.props.imagechange(database.head[2].uri); }}>
              <Text style={{ fontSize: 15 }}>파란색</Text>
            </TouchableOpacity> */}
          </View>

          <Text style={s.head}>상의</Text>
          <View style={s.container}>

          {this.state.tops.map((top, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              // console.log(head.uri);
            return <TouchableOpacity style={s.yellow} key={index}
              onPress = {() => { this.props.imagechange1(top.uri); }}>
                <Text style={{ fontSize: 15 }}>노란색</Text>
              </TouchableOpacity>;
          })}

          {/* <TouchableOpacity style={s.red}
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
            </TouchableOpacity> */}
          </View>

          <Text style={s.head}>하의</Text>
          <View style={s.container}>

          {this.state.pantss.map((pants, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              // console.log(head.uri);
            return <TouchableOpacity style={s.blue} key={index}
              onPress = {() => { this.props.imagechange2(pants.uri); }}>
                <Text style={{ fontSize: 15 }}>파란색</Text>
              </TouchableOpacity>;
          })}

          {/* <TouchableOpacity style={s.red}
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
            </TouchableOpacity> */}
          </View>

          <Text style={s.head}>펫</Text>
          <View style={s.container}>

          {this.state.pets.map((pet, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              // console.log(head.uri);
            return <TouchableOpacity style={s.gray} key={index}
              onPress = {() => { this.props.imagechange3(pet.uri); }}>
                <Text style={{ fontSize: 15 }}>진회색</Text>
              </TouchableOpacity>;
          })}

          {/* <TouchableOpacity style={s.pet1}
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
            </TouchableOpacity> */}
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
  gray: {
    marginLeft: 30,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 20,
  },
  head: {
    marginLeft: 15,
  },
  head1: {
    marginLeft: 15,
    marginTop: 300,
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
  basichead: {
    marginTop: '-5%',
    marginLeft: '9%',
    marginBottom: '-5%',
    height:'10%',
    width:'10%',
    resizeMode:'contain',
  },
  basictop: {
    marginLeft: '9%',
    height:'10%',
    width:'11%',
    resizeMode:'contain',
  },
  basicpants: {
    marginLeft: '9%',
    marginBottom: '-3%',
    height:'7%',
    width:'8%',
    resizeMode:'contain',
  },
  basicpet: {
    marginLeft: '9%',
    marginBottom: '-70%',
    height:'10%',
    width:'11%',
    resizeMode:'contain',
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
