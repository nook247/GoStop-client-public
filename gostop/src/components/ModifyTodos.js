import React, { Component } from "react";
import { TextInput, Text, StyleSheet, View, Button, TouchableOpacity,
TouchableHighlight, AsyncStorage } from "react-native";
import { readBuilderProgram } from "typescript";
import DatePicker from './DatePicker';
import TimePicker from "react-native-24h-timepicker";
import { connect } from 'react-redux';
import savetodos from '../actions/todosaction'
import fakeserver from '../fakeserver'

// 날짜
import saveStartDate from '../actions/startdateaction'
import saveEndDate from '../actions/enddateaction'

class ModifyTodos extends Component {
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
        console.log('수정할 데이터 : ', dataToModify)
        let { title, description, difficulty, dateStart, dateEnd, completed } = dataToModify[0] 

        this._titleInput.setNativeProps({text: title})
        this._contentsInput.setNativeProps({text: description})

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
                    styles.DayButtonSelected :styles.DayButtonStyle} activeOpacity={0.5}
                    onPress={() => { 
                        this.setState({
                        alarmTime: {
                            ...this.state.alarmTime,
                            dayOfWeek: day
                        }
                        })
                    }} >
                <Text style={styles.textStyle}>{day}</Text>
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
        this._titleInput.setNativeProps({text: ''});
        this._contentsInput.setNativeProps({text: ''})        
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
    }

    EditData = async() => {  // 수정 요망
        // 날짜 먼저 설정
        let StartDateStore = this.props.StartDate;
        let EndDateStore = this.props.EndDate;
        // console.log('시작 날짜 정보(AddTodos) : ', StartDateStore, typeof(StartDateStore), '---')        
        // console.log('끝 날짜 정보(AddTodos)) : ', EndDateStore, typeof(EndDateStore), '---')

        let todo = this.state.todo;   
        todo.dateStart = StartDateStore;
        todo.dateEnd = EndDateStore;  

        let arr = this.props.todosarr

        for (let i=0; i<arr.length; i++) {
            if (arr[i]["title"] === this.title) {
                arr[i] = todo;
                break;
            }
        }

        this.props.savetodos([...arr])

        // let token = '';
        // await AsyncStorage.getItem('token', (err, result) => {
        //     token = result
        // })
        // let header = new Headers();
        // header.append('Cookie', token)
        // header.append('Content-Type', 'application/json')

        // const getInit = {
        //     method : 'GET',
        //     headers : header,
        //     Cookie : token
        // }

        // if (this.todoIdToModify === undefined) {
        //     fetch(`${fakeserver}/users/todos`, getInit)
        //     .then((res) => {
        //         if (res.status === 200 || res.status === 201) {
        //             res.json().then((data) => {
        //                 let todoData = data.todos.filter(element => element.title === this.props.navigation.state.params.title)
        //                 this.todoIdToModify = todoData[0]["_id"]

        //                 const myInit = {
        //                     method : 'PATCH',
        //                     body: JSON.stringify(todo),
        //                     headers : header,
        //                     Cookie : token
        //                 }        
                
        //                 fetch(`${fakeserver}/todos/${this.todoIdToModify}`, myInit)
        //                 .then(res => res.json())
        //                 .then(res => console.log('Success : ', JSON.stringify(res)))
        //                 .catch(error => console.error('Error : ', error));
        //             })

        //         }
        //     })
        }
        // else {
        //     const myInit = {
        //         method : 'PATCH',
        //         body: JSON.stringify(todo),
        //         headers : header,
        //         Cookie : token
        //     }        
    
        //     fetch(`${fakeserver}/todos/${this.todoIdToModify}`, myInit)
        //     .then(res => res.json())
        //     .then(res => console.log('Success : ', JSON.stringify(res)))
        //     .catch(error => console.error('Error : ', error));
        // }
    

    render() {        
        return (
            <View style={styles.mainContainer}>

                <View style={styles.subContainer}>
                
                <View style={styles.InputContainer}>            
                    <Text>제목 : </Text>
                    <TextInput style={styles.Input} placeholder='Todo'
                    ref={component => this._titleInput = component}                    
                    onChangeText={(text) =>                         
                        { this.setState({
                            todo: {
                                ...this.state.todo,
                                title: text
                            }
                        })
                    }}/>
                </View>
                
                <View style={styles.InputContainer}>
                    <Text>내용 : </Text>
                    <TextInput style={styles.Input} placeholder='Contents'
                    ref={component => this._contentsInput = component}       
                    onChangeText={(text) => 
                        { this.setState({
                            todo: {
                                ...this.state.todo,
                                description: text
                            }
                        })
                    }}/>
                </View>

                <View style={styles.ButtonContainer}>
                    <Text>난이도 : </Text>
                    <TouchableHighlight
                    style={
                        this.state.todo.difficulty === 1 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({
                        todo: {
                            ...this.state.todo,
                            difficulty: 1
                        }
                    })
                    }} >
                    <Text style={styles.textStyle}>1</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    style={
                        this.state.todo.difficulty === 2 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({
                        todo: {
                            ...this.state.todo,
                            difficulty: 2
                        }
                    }) 
                    }} >
                    <Text style={styles.textStyle}>2</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    style={
                        this.state.todo.difficulty === 3 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({
                        todo: {
                            ...this.state.todo,
                            difficulty: 3
                        }
                    })
                    }} >
                    <Text style={styles.textStyle}>3</Text>
                    </TouchableHighlight>            
                </View>

                <View style={styles.container}>       
                  <Text style={styles.text}>알림 : {this.state.alarmTime.time}</Text>   

                  <View style={styles.DayButtonContainer}>
                    {this.lapsList()}
                  </View>

                  <TouchableOpacity
                    onPress={() => this.TimePicker.open()}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>알림 설정</Text>
                  </TouchableOpacity>

                  <TimePicker
                    ref={ref => {
                      this.TimePicker = ref;
                    }}
                    onCancel={() => this.onCancel()}
                    onConfirm={(hour, minute) => {
                      this.onConfirm(hour, minute);
                      this.alarmOn();
                    }
                  }
                  />
                </View>

                <View>
                    <DatePicker setDate={this.setDate} startOrEnd='Start' 
                    forModify={this.props.StartDate}/>
                    <DatePicker setDate={this.setDate} startOrEnd='End' 
                    forModify={this.props.EndDate}/>
                </View>
                
                <TouchableOpacity
                    style={styles.addButton} activeOpacity={0.5}
                    onPress={() => {
                        this.EditData();
                        alert("수정되었습니다")
                        this.props.navigation.navigate('Todos')  // 메인 페이지로 이동
                    }} >
                    <Text style={styles.textStyle}>수정</Text>                    
                </TouchableOpacity> 

                <TouchableOpacity style={styles.addButton} activeOpacity={0.5}
                onPress={this.clearText}>
                    <Text>초기화</Text>
                </TouchableOpacity>

            </View>
            </View>
        )
    }
}

//export default AddTodos;

// 데이터 불러오기
const mapStateToProps = (state) => {  
    // console.log('state 나와', state)
    return {
      todosarr : state.todosreducer.todosarr,
      StartDate : state.StartDateReducer.date,
      EndDate : state.EndDateReducer.date
    }
}  

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

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth:2
    },
    subContainer: {
        borderColor: 'black',
        borderWidth:2
    },
    InputContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    Input: {
        width: 200,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1
    },
    ButtonContainer: {        
        flexDirection: 'row',        
    },
    buttonStyle: {
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#fcba03",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff"
    },
    buttonSelected: {
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#ff5500",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff"
    },
    addButton: {
        padding: 5,
        backgroundColor: "#fcba03",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: 'center',
        width: 60
    },
    container: {
        //flex: 1,
        //alignItems: "center",
        //flexDirection: 'row',
        backgroundColor: "#fff",
        //justifyContent: 'space-around'
        //paddingTop: 100
      },
      DayButtonContainer: {        
        flexDirection: 'row',        
      },
      DayButtonStyle: {
          marginLeft: 5,
          paddingLeft: 5,
          paddingRight: 5,
          backgroundColor: "#fcba03",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#fff"
      },
      DayButtonSelected: {
          marginLeft: 5,
          paddingLeft: 5,
          paddingRight: 5,
          backgroundColor: "#ff5500",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#fff"
      },
      button: {
        backgroundColor: "#4EB151",
        paddingVertical: 5,
        borderRadius: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: 90
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
      }
})