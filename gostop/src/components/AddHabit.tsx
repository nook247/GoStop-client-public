import React, { Component } from "react";
import { Text, View, TouchableOpacity,
TouchableHighlight, AsyncStorage } from "react-native";
import TimePicker from "react-native-24h-timepicker";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import savehabit from '../actions/habitaction'
import fakeserver from '../fakeserver'
import styles from './cssStyles'

import AddOrModifyButton from './commonComponents/AddOrModifyButton'
import ResetButton from './commonComponents/ResetButton'
import DifficultySection from './commonComponents/DifficultySection'
import PositiveSection from './commonComponents/PositiveSection'
import ContentsSection from "./commonComponents/ContentsSection";

class AddHabit extends Component<any, any> {
    TimePicker: any;
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
  
    onConfirm(hour: number, minute: number) {
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
        .then(res => console.log(res))
        .catch(error => console.error(error));
    }

    render() {
        return (
            <View style={styles.mainContainer}>  
            <ScrollView>     

                <View style={styles.topButtonContainer}>
                    <Text style={{fontSize: 20,
                        fontWeight: 'bold', color: 'white',
                        position: 'absolute', left: 10}}>Title</Text>
                        
                    <AddOrModifyButton addOrModify='add'
                    func={this.sendData} category='Habits'
                    navigation={this.props.navigation}/>
                </View>

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

                    <Text style={styles.titleStyle}>Alarm</Text>

                    <View style={{
                        ...styles.ButtonContainer, 
                        marginTop: 10, justifyContent: 'space-between'
                    }}>
                        <Text style={styles.subtitleStyle}>Time : {this.state.alarmTime.time}</Text>   

                        <TouchableOpacity
                            onPress={() => this.TimePicker.open()}
                            style={styles.alarmButton}
                            activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>Set Time</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View>
                        <Text style={styles.subtitleStyle}>요일</Text>
                        <View style={styles.ButtonContainer}>{this.lapsList()}</View>
                    </View>

                    <TimePicker
                        ref={ref => {
                            this.TimePicker = ref;
                        }}
                        onCancel={() => this.onCancel()}
                        itemStyle={{ backgroundColor: 'lightgrey', marginLeft: 0, paddingLeft: 15 }}
                    />
                </View>
                
                <View style={{...styles.ButtonContainer, justifyContent: 'flex-end'}}>             
                    <ResetButton clearText={this.clearText} />                    
                </View>

            </ScrollView>  
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