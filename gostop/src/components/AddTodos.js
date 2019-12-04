import React, { Component } from "react";
import { Text, View, TouchableOpacity,
TouchableHighlight, AsyncStorage } from "react-native";
import { readBuilderProgram } from "typescript";
import DatePicker from './DatePicker';
import TimePicker from "react-native-24h-timepicker";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import savetodos from '../actions/todosaction'
import fakeserver from '../fakeserver'
import saveStartDate from '../actions/startdateaction'
import saveEndDate from '../actions/enddateaction'
import styles from './cssStyles'

import AddOrModifyButton from './commonComponents/AddOrModifyButton'
import ResetButton from './commonComponents/ResetButton'
import DifficultySection from './commonComponents/DifficultySection'
import ContentsSection from "./commonComponents/ContentsSection";

class AddTodos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: {
                title: '',
                description: '',
                difficulty: '',  
                dateStart: '',
                dateEnd: '',         
                completed: true
            },
            alarmTime : {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        }
        this.dateReset = false;
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
            todo: {
                title: '',
                description: '',
                difficulty: '',  
                dateStart: '',
                dateEnd: '',         
                completed: true
            },
            alarmTime: {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        })
        this.props.saveStartDate('')
        this.props.saveEndDate('')
    }
      
    sendData = async() => {   
        let StartDateStore = this.props.StartDate;
        let EndDateStore = this.props.EndDate;

        let todo = this.state.todo;   
        todo.dateStart = StartDateStore;
        todo.dateEnd = EndDateStore;  
        
        let todoArr = this.props.todosarr        
        this.props.savetodos([...todoArr, todo])

        let token = '';
        await AsyncStorage.getItem('token', (err, result) => {
            token = result
        })
        let header = new Headers();
        header.append('Cookie', token)
        header.append('Content-Type', 'application/json')

        const myInit = {
            method : 'POST',
            body: JSON.stringify(todo),
            headers : header,
            Cookie : token
        }

        fetch(`${fakeserver}/todos`, myInit)
        .then(res => console.log(res))
        .catch(error => console.error('Error : ', error));
    }

    render() {
        return (
            <View style={styles.mainContainer}>
            <ScrollView>

                <View style={{flexDirection: 'row', backgroundColor: '#110133',
                paddingLeft: 10}}>
                    <Text style={{fontSize: 20,
                        fontWeight: 'bold', color: 'white'}}>Title</Text>
                    <AddOrModifyButton addOrModify='add'
                    func={this.sendData} category='Todos'
                    navigation={this.props.navigation}/>
                </View>
                
                <ContentsSection 
                    titleDefaultValue={this.state.todo.title}
                    onChangeTitle={(text) =>                         
                        { this.setState({
                            todo: { ...this.state.todo, title: text }
                        })
                    }}
                    onChangeContents={(text) =>                         
                        { this.setState({
                            todo: { ...this.state.todo, description: text }
                        })
                    }}
                    TextAreaDefaultValue={this.state.todo.description}
                    category={'Todos'}
                />               

                <DifficultySection difficulty={this.state.todo.difficulty}
                    onPressFunction={(diff) => { this.setState({
                        todo: { ...this.state.todo, difficulty: diff }
                        })
                    }} 
                />

                <View style={styles.componentsContainer}>         
                
                    <Text style={styles.titleStyle}>Alarm</Text>
                
                    <View style={{
                        ...styles.ButtonContainer,
                        marginTop:10, justifyContent: 'space-between'
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
                        <Text style={{fontSize:17, fontWeight: 'normal', marginBottom: 10}}>요일 :</Text>
                        <View style={styles.ButtonContainer}>{this.lapsList()}</View>
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

                <View style={styles.componentsContainer}>
                    <Text style={styles.titleStyle}>Date</Text>
                    <DatePicker startOrEnd='Start' forModify={false}/>
                    <DatePicker startOrEnd='End' forModify={false}/>
                </View>
                
                <View>
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
      todosarr : state.todosreducer.todosarr,
      StartDate : state.StartDateReducer.date,
      EndDate : state.EndDateReducer.date
    }
}  

// store 변경
const mapDispatchToProps = dispatch => {
    return {      
      savetodos : (arr) => {
        dispatch(savetodos(arr));
      },
      saveStartDate : (date) => {
        dispatch(saveStartDate(date));
      },
      saveEndDate : (date) => {
        dispatch(saveEndDate(date));
      }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AddTodos);