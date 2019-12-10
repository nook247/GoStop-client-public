import React, { Component } from "react";
import { Text, View, TouchableOpacity,
TouchableHighlight, AsyncStorage } from "react-native";
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
import DeleteButton from './commonComponents/DeleteButton'
import DifficultySection from './commonComponents/DifficultySection'
import ContentsSection from "./commonComponents/ContentsSection";

class ModifyTodos extends Component<any, any> {
    todoIdToModify: any;
    dataToModify: any;
    title: any;
    TimePicker: any;
    constructor(props) {
        super(props);
        this.state = {
            todo: {
                title: '',
                description: '',
                difficulty: '',  
                dateStart: '',
                dateEnd: '',         
                completed: false
            },
            alarmTime : {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        }    
        this.todoIdToModify;
        this.title;
        this.dataToModify;
    }

    componentDidMount() {
        this.title = this.props.navigation.state.params.title
        let dataToModify = this.props.todosarr.filter(
            element => element.title === this.props.navigation.state.params.title
        )
        this.dataToModify = dataToModify[0]
        let { title, description, difficulty, dateStart, dateEnd, completed } = dataToModify[0] 

        this.setState({
            todo: {
                title,
                description,                
                difficulty,
                dateStart,
                dateEnd,
                completed
            }
        })   
        this.todoIdToModify = dataToModify[0]["_id"]  
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
                completed: false
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

    EditData = async(method) => {
        let StartDateStore = this.props.StartDate;
        let EndDateStore = this.props.EndDate;

        let todo = this.state.todo;   
        
        if (StartDateStore === '') { todo.dateStart = this.state.todo.dateStart }        
        else { todo.dateStart = StartDateStore }

        if (EndDateStore === '') { todo.dateEnd = this.state.todo.dateEnd }
        else { todo.dateEnd = EndDateStore }

        let arr = this.props.todosarr

        for (let i=0; i<arr.length; i++) {
            if (arr[i]["title"] === this.title) {
                if (method === 'DELETE') {
                    arr.splice(i, 1)
                }
                else {
                    arr[i] = todo;
                }
                break;
            }
        }

        this.props.savetodos([...arr])

        let token = '';
        await AsyncStorage.getItem('token', (err, result) => {
            token = result
        })
        let header = new Headers();
        header.append('Cookie', token)
        header.append('Content-Type', 'application/json')

        const getInit = {
            method : 'GET',
            headers : header,
            Cookie : token
        }

        if (this.todoIdToModify === undefined) {
            fetch(`${fakeserver}/users/todos`, getInit)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then((data) => {
                        let todoData = data.todos.filter(element => element.title === this.props.navigation.state.params.title)
                        this.todoIdToModify = todoData[0]["_id"]

                        if (method === 'DELETE') {
                            let myInit = {
                                method : 'DELETE',
                                headers : header,
                                Cookie : token
                            }        
                    
                            fetch(`${fakeserver}/todos/${this.todoIdToModify}`, myInit)
                            .then(res => console.log(res))
                            .catch(error => console.error(error));
                        }
                        else {
                            let myInit = {
                                method : 'PATCH',
                                body: JSON.stringify(todo),
                                headers : header,
                                Cookie : token
                            }        
                    
                            fetch(`${fakeserver}/todos/${this.todoIdToModify}`, myInit)
                            .then(res => console.log(res))
                            .catch(error => console.error(error));
                        }
                    })

                }
            })
        }
        else {
            if (method === 'DELETE') {
                let myInit = {
                    method : 'DELETE',
                    headers : header,
                    Cookie : token
                }        
        
                fetch(`${fakeserver}/todos/${this.todoIdToModify}`, myInit)
                .then(res => console.log(res))
                .catch(error => console.error(error));
            }
            else {
                let myInit = {
                    method : 'PATCH',
                    body: JSON.stringify(todo),
                    headers : header,
                    Cookie : token
                }        
        
                fetch(`${fakeserver}/todos/${this.todoIdToModify}`, myInit)
                .then(res => console.log(res))
                .catch(error => console.error('Error : ', error));
            }
        }
    }

    render() {               
        return (
            <View style={styles.mainContainer}>
            <ScrollView>

                <View style={styles.topButtonContainer}>
                    <Text style={{fontSize: 20,
                        fontWeight: 'bold', color: 'white',
                        position: 'absolute', left: 10}}>Title</Text>
                        
                    <AddOrModifyButton addOrModify='modify'
                    func={this.EditData} category='Todos'
                    navigation={this.props.navigation}/>

                    <DeleteButton EditData={this.EditData} category='Todos'
                    navigation={this.props.navigation} />
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
                    category='Todos'
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
                        itemStyle={{ backgroundColor: 'lightgrey', marginLeft: 0, paddingLeft: 15 }}
                    />
                </View>

                <View style={styles.componentsContainer}>
                    <Text style={styles.titleStyle}>Date</Text>
                    <DatePicker startOrEnd='Start' 
                    forModify={this.state.todo.dateStart.toString().slice(0,10)}/>
                    <DatePicker startOrEnd='End' 
                    forModify={this.state.todo.dateEnd.toString().slice(0,10)}/>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModifyTodos);