import React, { Component } from "react";
import { TextInput, Text, StyleSheet, View, Button, TouchableOpacity,
TouchableHighlight } from "react-native";
import { readBuilderProgram } from "typescript";
import TimePicker from "react-native-24h-timepicker";
import { connect } from 'react-redux';

class AddHabit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habit: {
                title: '',
                description: '',
                alarmId: '',  // alarmId 는 alarm 테이블에서 가져와야 함
                difficulty: '',            
                positive: true
            },
            alarmTime : {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        }    
        this.habitToModify = 1    
    }

    // componentDidMount() {
    //     fetch(`http://42565614.ngrok.io/habits/${this.habitToModify}`)   // 테스트를 위해 id=1 인 값을 가져옴.
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log('HABIT 응답 : ', res)
    //         // console.log(res.title)
    //         // console.log(res.description)
    //         // console.log(res.difficulty)
    //         this._titleInput.setNativeProps({text: res.title})
    //         this._contentsInput.setNativeProps({text: res.description})
    //         this.setState({
    //             habit: {
    //                 ...this.state.habit,
    //                 alarmId: res.alarmId,
    //                 difficulty: res.difficulty
    //             }
    //         })
    //     })

    //     fetch(`http://42565614.ngrok.io/alarms/${this.state.habit.alarmId}`)   // 테스트를 위해 id=1 인 값을 가져옴.
    //     .then(res => res.json())
    //     .then(res => {
    //          console.log('ALARM 응답 : ', res[0])
    //         // console.log(res.time)
    //         // console.log(res.dayOfWeek)

    //         this.setState({
    //             alarmTime: {
    //                 status: res[0].status,
    //                 time: res[0].time,
    //                 dayOfWeek: res[0].dayOfWeek
    //             }
    //         })
    //     })    

    // }

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
        console.log("TIME IS : ", this.state.alarmTime)
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
                        //console.log(this.state.alarmTime) 
                    }} >
                <Text style={styles.textStyle}>{day}</Text>
            </TouchableHighlight>
            )
        })    
    }

    setAlarmTime = (time, dayOfWeek) => {
        this.state.alarmTime.time = time
        this.state.alarmTime.dayOfWeek = dayOfWeek
        //console.log(this.state.alarmTime)
    }

    alarmOn = () => {
        this.setState({
            alarmTime: {
                ...this.state.alarmTime,
                status: true
            }
        })
        //console.log('ALARM SETTING : ', this.state.alarmTime)
    }

    clearText = () => {
        this._titleInput.setNativeProps({text: ''});
        this._contentsInput.setNativeProps({text: ''})        
        this.setState({
            habit: {
                title: '',
                description: '',
                alarmId: this.state.habit.alarmId,
                difficulty: '',
                positive: true
            },
            alarmTime: {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        })
        //console.log(this.state)
    }

    // EditData = () => {  // 수정 요망
    //     // this.props.savehabit(data.habits);   수정한 전체 데이터를 넣어주기
    //     let habit = this.state.habit;
    //     fetch(`http://42565614.ngrok.io/habits/${this.habitToModify}`, {   // 테스트를 위해 임시로 id=2 인 값을 수정. 추후에 id 값을 받아서 입력
    //         method: 'PUT',
    //         body: JSON.stringify(habit),
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json())
    //     .then(res => console.log('Success : ', JSON.stringify(res)))
    //     .catch(error => console.error('Error : ', error));

    //     let alarm = this.state.alarmTime;
    //     fetch(`http://42565614.ngrok.io/alarms/${this.state.habit.alarmId}`, {  // 테스트를 위해 임시로 id=2인 값을 수정
    //         method: 'PUT',
    //         body: JSON.stringify(alarm),
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => res.json())
    //     .then(res => console.log('Success : ', JSON.stringify(res)))
    //     .catch(error => console.error('Error : ', error));
    // }

    render() {
        console.log('state 잘 전달됐니? ModifyHabit : ', this.props.habitarr) 
        title = this.props.navigation.state.params.title;     
        console.log('title전달됐니? ModifyHabit : ', title)
        return (
            <View style={styles.mainContainer}>

                <View style={styles.subContainer}>
                
                <View style={styles.InputContainer}>            
                    <Text>제목 : </Text>
                    <TextInput style={styles.Input} placeholder='Habit'
                    ref={component => this._titleInput = component}                    
                    onChangeText={(text) =>                         
                        { this.setState({
                            habit: {
                                ...this.state.habit,
                                title: text
                            }
                        })
                          console.log(this.state)
                    }}/>
                </View>
                
                <View style={styles.InputContainer}>
                    <Text>내용 : </Text>
                    <TextInput style={styles.Input} placeholder='Contents'
                    ref={component => this._contentsInput = component}       
                    onChangeText={(text) => 
                        { this.setState({
                            habit: {
                                ...this.state.habit,
                                description: text
                            }
                        })
                        console.log(this.state)
                    }}/>
                </View>

                <View style={styles.ButtonContainer}>
                    <Text>난이도 : </Text>
                    <TouchableHighlight
                    style={
                        this.state.habit.difficulty === 1 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({
                        habit: {
                            ...this.state.habit,
                            difficulty: 1
                        }
                    })
                    console.log(this.state)
                    }} >
                    <Text style={styles.textStyle}>1</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    style={
                        this.state.habit.difficulty === 2 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({
                        habit: {
                            ...this.state.habit,
                            difficulty: 2
                        }
                    }) 
                    console.log(this.state)
                    }} >
                    <Text style={styles.textStyle}>2</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                    style={
                        this.state.habit.difficulty === 3 ? 
                        styles.buttonSelected :styles.buttonStyle} activeOpacity={0.5}
                    onPress={() => { this.setState({
                        habit: {
                            ...this.state.habit,
                            difficulty: 3
                        }
                    })
                    console.log(this.state)
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
                
                <TouchableOpacity
                    style={styles.addButton} activeOpacity={0.5}
                    onPress={() => {
                        console.log(this.state);
                        //this.EditData();
                        alert("수정되었습니다")
                        this.props.navigation.navigate('Habits')  // 메인 페이지로 이동
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

//export default AddHabit;

// 데이터 불러오기
const mapStateToProps = (state) => {  
    console.log('state 나와', state)
    return {
      habitarr : state.habitreducer.habitarr
    }
}  

const mapDispatchToProps = dispatch => {
    return {      
      savehabit : (arr) => {
        dispatch(savehabit(arr));
      },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AddHabit);

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
    sideBar: {
        padding: 10,
        backgroundColor: "#fcba03",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: 'auto'
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