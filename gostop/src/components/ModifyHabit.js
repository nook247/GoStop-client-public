import React, { Component } from "react";
import { TextInput, Text, StyleSheet, View, Button, TouchableOpacity,
TouchableHighlight, AsyncStorage } from "react-native";
import { readBuilderProgram } from "typescript";
import TimePicker from "react-native-24h-timepicker";
import { connect } from 'react-redux';
import savehabit from '../actions/habitaction'

class ModifyHabit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habit: {
                title: '',
                description: '',
                difficulty: '',     
                completed: true,       
                positive: true
            },
            alarmTime : {
                status: false,
                time: '',
                dayOfWeek: ''
            }
        }    
        this.habitIdToModify;
        this.dataToModify;
    }

    componentDidMount() {
        let dataToModify = this.props.habitarr.filter(
            element => element.title === this.props.navigation.state.params.title
        )
        this.dataToModify = dataToModify[0]

        console.log('원래 데이터 : ', this.props.habitarr)
        console.log('수정할 데이터 : ', dataToModify[0])

        let { title, description, completed, difficulty, positive } = dataToModify[0] 

        this._titleInput.setNativeProps({text: title})
        this._contentsInput.setNativeProps({text: description})

        this.setState({
            habit: {
                title,
                description,                
                difficulty,
                completed, 
                positive
            }
        })   
        this.habitIdToModify = dataToModify[0]["_id"]
        console.log("수정할 데이터 ID : ", this.habitIdToModify)    
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

    EditData = async() => {  // 수정 요망
        let habit = this.state.habit;

        //console.log('원래 데이터 : ', this.props.habitarr)
        //console.log('수정할 데이터2 : ', this.dataToModify)

        let arr = this.props.habitarr

        for (let i=0; i<arr.length; i++) {
            if (arr[i]["_id"] === this.habitIdToModify) {
                arr[i] = habit;
                break;
            }
        }

        //console.log('수정 후 데이터 : ', arr)

        this.props.savehabit([...arr])

        let token = '';
        await AsyncStorage.getItem('token', (err, result) => {
            token = result
        })
        let header = new Headers();
        header.append('Cookie', token)
        header.append('Content-Type', 'application/json')

        //console.log('헤더는 ? : ', header)
        const myInit = {
            method : 'PATCH',
            body: JSON.stringify(habit),
            headers : header,
            Cookie : token
        }

        fetch(`http://52.79.229.136:5000/habits/${this.habitIdToModify}`, myInit)
        .then(res => res.json())
        .then(res => console.log('Success : ', JSON.stringify(res)))
        .catch(error => console.error('Error : ', error));
    }

    render() {
        //console.log('ModifyHabit에서 state 잘 전달됐니? : ', this.props.habitarr) 
        //title = this.props.navigation.state.params.title;     
        //console.log('title전달됐니? ModifyHabit : ', title)

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
                          //console.log(this.state)
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
                        //console.log(this.state)
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
                    //console.log(this.state)
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
                    //console.log(this.state)
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
                    //console.log(this.state)
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
                        //console.log(this.state);
                        this.EditData();
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

//export default ModifyHabit;

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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModifyHabit);

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