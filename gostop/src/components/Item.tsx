import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { imagechange, imagechange1, imagechange2 } from '../actions/';
import Characterinfo from '../components/characterinfo';



class Item extends Component<any, any, any> {

  constructor(props, context) {
    super(props, context);

    // console.log(this.props.uri1);
    // console.log('componets의 heads', this.props.heads)
    // this.state = {
    //   heads: this.props.heads,
    //   tops:  this.props.tops,
    //   pantss: this.props.pantss
    // }
  }

  // public componentDidMount() {
  //     this.setState = {
  //       heads: this.props.heads,
  //       tops:  this.props.tops,
  //       pantss: this.props.pantss
  //     }
  // }
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
            console.log('확인!!!', this.props.heads)
    return (
          <View style={s.contain}>
            
            <Characterinfo/>
            
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

          <Text style={s.head1}>머리</Text>
          <View style={s.container} >

            {/* {this.props.heads.map((head, index) => {
              // tslint:disable-next-line: no-unused-expression
              return <Image key={index} style={s.pink} source={{uri: head}}/>
            })} */}

            {this.props.heads.map((head, index) => {
              // tslint:disable-next-line: no-unused-expression
              // console.log(index);
              console.log('가지고옴', head);
              return <TouchableOpacity style={s.red} key={index}
              onPress = {() => { this.props.imagechange(head); }}>
                {/* <Text style={{ fontSize: 15 }}> 착용 </Text> */}
                <Image key={index} style={s.pink} source={{uri: head}}/>
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
              return <TouchableOpacity style={s.red} key={index}
              onPress = {() => { this.props.imagechange1(top); }}>
                {/* <Text style={{ fontSize: 15 }}> 착용 </Text> */}
                <Image key={index} style={s.pink} source={{uri: top}}/>
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
              return <TouchableOpacity style={s.red} key={index}
              onPress = {() => { this.props.imagechange2(pants); }}>
                {/* <Text style={{ fontSize: 15 }}> 착용 </Text> */}
                <Image key={index} style={s.pink} source={{uri: pants}}/>
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
    );
  }
}

const s = StyleSheet.create({
  contain:{
    borderWidth: 1,
    borderColor: 'black',
    // backgroundColor : '#110133',
    // flex: 1,
    // width : '100%',

  },
  container: {
    marginTop: 5,
    marginBottom: 15,
    flexDirection: 'row',
  },
  pink: {
    marginLeft: 15,
    backgroundColor: 'white',
    padding: 20,
    height: 30,
    width: 50,
    resizeMode:'contain',
  },
  red: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  head: {
    marginLeft: 25,
    marginTop: 40,
  },
  head1: {
    marginLeft: 25,
    marginTop: 80,
  },
  basichead: {
    marginTop: '2%',
    marginLeft: '7.95%',
    marginBottom: '-5%',
    height:'10%',
    width:'10%',
    resizeMode:'contain',
  },
  basictop: {
    marginLeft: '7.5%',
    marginTop: '1%',
    height:'10%',
    width:'11%',
    resizeMode:'contain',
  },
  basicpants: {
    marginLeft: '9%',
    marginBottom: '-3%',
    marginTop: '-4%',
    height:'7%',
    width:'8%',
    resizeMode:'contain',
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
  console.log('머리',state.additem.heads)
  console.log('상의', state.additem1.tops)
  return {
    uri: state.changeReducer.uri,
    uri1: state.changeReducer1.uri1,
    uri2: state.changeReducer2.uri2,
    heads: state.additem.heads,
    tops: state.additem1.tops,
    pantss: state.additem2.pantss

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
