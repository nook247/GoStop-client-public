import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { imagechange, imagechange1, imagechange2 } from '../actions/';
import Characterinfo from '../components/characterinfo';

class Item extends Component<any, any, any> {

  constructor(props, context) {
    super(props, context);

  }

  // public componentDidMount() {
  //   fetch(`{fakeserver}/items`).then((res) => {
  //     console.log(res);
  //     if (res.status === 200 || res.status === 201) {
  //       // tslint:disable-next-line: ter-arrow-parens
  //       res.json().then(data => {
  //         console.log(data);
  //         this.setState({ heads: data });
  //         // console.log(this.state);
  //       });
  //     }else {
  //       console.error(res.statusText);
  //     }
  //   }).catch(err => console.error(err));

  //   fetch(`{fakeserver}/items`).then((res) => {
  //     if (res.status === 200 || res.status === 201) {
  //       // tslint:disable-next-line: ter-arrow-parens
  //       res.json().then(data => {
  //         console.log(data);
  //         this.setState({ tops: data });
  //         // console.log(this.state);
  //       });
  //     }else {
  //       console.error(res.statusText);
  //     }
  //   }).catch(err => console.error(err));

  //   fetch(`{fakeserver}/items`).then((res) => {
  //     if (res.status === 200 || res.status === 201) {
  //       // tslint:disable-next-line: ter-arrow-parens
  //       res.json().then(data => {
  //         console.log(data);
  //         this.setState({ pantss: data });
  //         // console.log(this.state);
  //       });
  //     }else {
  //       console.error(res.statusText);
  //     }
  //   }).catch(err => console.error(err));

  //   fetch(`{fakeserver}/items`).then((res) => {
  //     if (res.status === 200 || res.status === 201) {
  //       // tslint:disable-next-line: ter-arrow-parens
  //       res.json().then(data => {
  //         console.log(data);
  //         this.setState({ pets: data });
  //         // console.log(this.state);
  //       });
  //     }else {
  //       console.error(res.statusText);
  //     }
  //   }).catch(err => console.error(err));
  // }

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
            <View style ={{ flex : 7 }}>
                <Characterinfo/>
              </View>

          <View style ={{ flex : 23.5 }}>
          <Text style={s.head1}>머리</Text>
          <View style={s.container} >

            {this.props.heads.map((head, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log('가지고옴', head);
              return <TouchableOpacity key={index}
              onPress = {() => { this.props.imagechange(head); }}>
                {/* <Text style={{ fontSize: 15 }}> 착용 </Text> */}
                <Image key={index} style={s.pink} source={{ uri: head }}/>
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

          {this.props.tops.map((top, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              // console.log('가지고옴', top);
            return <TouchableOpacity key={index}
              onPress = {() => { this.props.imagechange1(top); }}>
                {/* <Text style={{ fontSize: 15 }}> 착용 </Text> */}
                <Image key={index} style={s.pink} source={{ uri: top }}/>
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

          {this.props.pantss.map((pants, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              // console.log('가지고옴', pants);
            return <TouchableOpacity key={index}
              onPress = {() => { this.props.imagechange2(pants); }}>
                {/* <Text style={{ fontSize: 15 }}> 착용 </Text> */}
                <Image key={index} style={s.pink} source={{ uri: pants }}/>
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
    borderWidth: 1,
    borderColor: 'black',
    // backgroundColor : '#110133',
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
  },
  head1: {
    marginLeft: 25,
    marginTop: 70,
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
