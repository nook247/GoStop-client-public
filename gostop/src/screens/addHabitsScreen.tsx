import React from 'react';
import { Button, Text, View } from 'react-native';
import AddHabit from '../components/AddHabit';
import fakeserver from '../fakeserver';
import { connect } from 'react-redux';

class AddHabitScreen extends React.Component <any, any> {
  title = this.props.navigation.state.params.title;
  // alarmId = this.params.alarmId
  // getdata = this.params.getdata

//     componentWillUnmount() {
// //  this.props.navigation.addListener('didFocus', () => {
// //      this.getdata();
// //   })
// this.getdata();
//     }
  public render() {
    // console.log('id ::', this.id, 'title')
    console.log('state 잘 전달됐니?', this.props.habitarr)
    console.log('title전달됐니?', this.title)

    return (

    <View>
   <Button title = "go back" onPress={() => { this.props.navigation.goBack()}} />
       <AddHabit />

       <Button title = 'test' 
       onPress = {() => {
         fetch(`${fakeserver}/habits`, {
           method : 'POST',
           body : JSON.stringify({
             title : "44444바껴라",
             description : '111111',
             difficulty : 3,
             positive : true,
           }),
           headers : {
             'Content-Type' : 'application/json',
           },
         }).then((res)=>{
           if(res.status ===200 || res.status ===201){
             res.json()
             .then(()=>{console.log('test 변경 성공')}
             ) 
           }
         })}}/> 

    </View>
    );
  }
}

const mapStateToProps = (state) =>{
  console.log('state 나와', state)
  return {
    id : state.passhabitreducer.id,
    title : state.passhabitreducer.title,
    description : state.passhabitreducer.description,
    alarmId :state.passhabitreducer.alarmId,
    difficulty :state.passhabitreducer.difficulty,
    positive : state.passhabitreducer.positive,
    habitarr : state.habitreducer.habitarr,
  }
}

export default connect(mapStateToProps)(AddHabitScreen)