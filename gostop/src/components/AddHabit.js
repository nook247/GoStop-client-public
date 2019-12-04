import React, { Component } from "react";
import { Text, View, TouchableOpacity,
TouchableHighlight, AsyncStorage } from "react-native";
import { readBuilderProgram } from "typescript";
import TimePicker from "react-native-24h-timepicker";
import { connect } from 'react-redux';
import savehabit from '../actions/habitaction'
import fakeserver from '../fakeserver'
import styles from './cssStyles'

import AddOrModifyButton from './commonComponents/AddOrModifyButton'
import ResetButton from './commonComponents/ResetButton'
import DifficultySection from './commonComponents/DifficultySection'
import PositiveSection from './commonComponents/PositiveSection'
import ContentsSection from "./commonComponents/ContentsSection";

class AddHabit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habit: {
                title: '',
                description: '',
                difficulty: '',            
                completed: true,
                positive: ''
            },
            alarmTime : {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        }     
    }

    onCancel() {
        this.TimePicker.close();
      }
  
    onConfirm(hour, minute) {
        let stateToChange = this.state.alarmTime
        stateToChange.time = `${hour}:${minute}`

        this.setState({
            alarmTime: {
            time : stateToChange
            }
        });
        this.TimePicker.close();
    }

    lapsList() {
        const days = ['월', '화', '수', '목', '금', '토', '일']
        return days.map((day, index) => {
            return (
            <TouchableHighlight key={index}
                style={
                    this.state.alarmTime.dayOfWeek === day ? 
                    styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { 
                        this.setState({
                        alarmTime: {
                            ...this.state.alarmTime,
                            dayOfWeek: day
                        }
                        })
                    }} >
                <Text style={styles.buttonText}>{day}</Text>
            </TouchableHighlight>
            )
        })    
    }

    setAlarmTime = (time, dayOfWeek) => {
        this.state.alarmTime.time = time
        this.state.alarmTime.dayOfWeek = dayOfWeek
    }

    alarmOn = () => {
        this.setState({
            alarmTime: {
                ...this.state.alarmTime,
                status: true
            }
        })
    }

    clearText = () => {   
        this.setState({
            habit: {
                title: '',
                description: '',
                difficulty: '',
                completed: true,
                positive: ''
            },
            alarmTime: {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        })
    }
      
    sendData = async() => {  
        let habit = this.state.habit     
        let arr = this.props.habitarr       
        this.props.savehabit([...arr, habit])
        
        let token = '';
        await AsyncStorage.getItem('token', (err, result) => {
            token = result
        })
        let header = new Headers();
        header.append('Cookie', token)
        header.append('Content-Type', 'application/json')

        const myInit = {
            method : 'POST',
            body: JSON.stringify(habit),
            headers : header,
            Cookie : token
        }

        fetch(`${fakeserver}/habits`, myInit)
        .then(res => res.json())
        .then(res => console.log('Success : ', JSON.stringify(res)))
        .catch(error => console.error('Error : ', error));
    }

    render() {
        return (
            <View style={styles.mainContainer}>                          
            
                <ContentsSection 
                    titleDefaultValue={this.state.habit.title}
                    onChangeTitle={(text) =>                         
                        { this.setState({
                            habit: { ...this.state.habit, title: text }
                        })
                    }}
                    onChangeContents={(text) =>                         
                        { this.setState({
                            habit: { ...this.state.habit, description: text }
                        })
                    }}
                    TextAreaDefaultValue={this.state.habit.description}
                    category={'Habit'}
                />

                <PositiveSection positive={this.state.habit.positive}
                    onPressFunction={(positive) => { this.setState({
                        habit: { ...this.state.habit, positive: positive }
                        })
                    }}
                />

                <DifficultySection difficulty={this.state.habit.difficulty}
                    onPressFunction={(diff) => { this.setState({
                        habit: { ...this.state.habit, difficulty: diff }
                        })
                    }} 
                />

                <View style={styles.componentsContainer}>  

                    <View style={{
                        ...styles.ButtonContainer, justifyContent: 'space-between'
                    }}>
                        <Text style={styles.titleStyle}>Alarm : {this.state.alarmTime.time}</Text>   

                        <TouchableOpacity
                            onPress={() => this.TimePicker.open()}
                            style={styles.alarmButton}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>Set Alarm</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.ButtonContainer}>
                        <Text style={styles.titleStyle}>요일 :</Text>
                        {this.lapsList()}
                    </View>

                    <TimePicker
                        ref={ref => {
                            this.TimePicker = ref;
                        }}
                        onCancel={() => this.onCancel()}
                        onConfirm={(hour, minute) => {
                            this.onConfirm(hour, minute);
                            this.alarmOn();
                        }}
                    />
                </View>
                
                <View style={styles.ButtonContainer}>
                    <AddOrModifyButton addOrModify='add'
                    func={this.sendData} category='Habits'
                    navigation={this.props.navigation}/>

                    <ResetButton clearText={this.clearText} />                    
                </View>

            </View>
        )
    }
}

// store 조회
const mapStateToProps = (state) => {  
    return {
      habitarr : state.habitreducer.habitarr
    }
}  

// store 변경
const mapDispatchToProps = dispatch => {
    return {      
      savehabit : (arr) => {
        dispatch(savehabit(arr));
      },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AddHabit);