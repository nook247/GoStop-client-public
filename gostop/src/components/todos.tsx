import React, { Component } from 'react';
import { CheckBox, StyleSheet, Text, View, AsyncStorage, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import {  coinchange, healthchange, pointchange  } from '../actions/characterinfoaction';
import  TodoDatePicker  from './tododatepicker';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import  savetodos  from '../actions/todosaction';
import { MaterialIcons } from '@expo/vector-icons';

export interface Todo {
  id : string;
  title : string;
  desc : string;
  alarm : boolean;
  completed : boolean;
  difficulty : number;
}

interface TodosStates {
  // todos : Todo[];
  completecount : number;
  totallist : boolean;
}

class Todos extends Component<any, TodosStates> {
  constructor(props) {
    super(props);
    this.state = {
      // todos : [],
      completecount : 0,
      totallist : false,
    };
  }

  public async changecomplete (item) {
    const todoData = {
      completed: item.completed,
    };

    let token = '';
    await AsyncStorage.getItem('token', (err, result) => {
      token = result
    })
    let header = new Headers();
    header.append('Cookie', token)
    header.append('Content-Type', 'application/json')

    const myInit = {
      method : 'PATCH',
      body: JSON.stringify(todoData),
      headers : header,
      Cookie : token,
    }

    fetch(`${fakeserver}/todos/${item.id}`, myInit)
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.json()
            .then(() => console.log('checkbox put 성공'));
      }
    });
  }

  public async componentDidMount() {
    let token = '';
    await AsyncStorage.getItem('token', (err, result) => {
      token = result
    }
    )
    let header = new Headers();
    header.append('Cookie', token)
    const myInit = {
      method : 'GET',
      headers : header,
    }
    fetch(`${fakeserver}/users/todos`, myInit).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.json()
        .then(data => {

          if(!data.todos.length){
          //   let initState = {
          //     id : '',
          //     title : '제목을 입력하세요',
          //     desc : '설명을 입력하세요',
          //     alarm : true,
          //     completed : true,
          //     difficulty : 3,
          //   }
          // this.props.savetodos([initState]);
          } else {
            const todos = [];
            data.todos.forEach( element => {
              const todosobj = {
                id : element["_id"],
                title : element["title"],
                description : element["description"],
                difficulty : element["difficulty"],
                dateStart : element["dateStart"],
                dateEnd : element["dateEnd"],
                completed : element["completed"]
                //alarmId : element["alarmId"]
              }
              todos.push(todosobj);
            })
            this.props.savetodos(todos);

            for(let i=0; i<todos.length; i++){
              if (todos[i].completed) {
                this.setState({
                  completecount : this.state.completecount + 1,
                });
              }
            }
          }

        },

            );
      } else { // 실패를 알리는 HTTP 상태 코드면
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));

  }

  public calculus(date){
    //console.log('데이터 어디서 오는지? : ', date)

    if (date) {  // date null 아닐 때만
    var yyyy = date.substr(0,4);
    var mm = date.substr(5,2);
    var dd = date.substr(8,2);
    

    var resultdate = new Date(yyyy, mm-1, dd);
    return resultdate;
    }
  }

public todos(item){ 
  return  <View style = {styles.onehabit} key = {item.title}>

  <View style = {styles.positive}>
  <CheckBox
    value = {item.completed}
    onValueChange={ () => {
      const newtodos = this.props.todosarr;
      for (let i=0; i<newtodos.length; i++) {
        if (newtodos[i].title === item.title) {
          newtodos[i].completed = !newtodos[i].completed;
        }
      }
      this.props.savetodos(newtodos);

      if (item.completed) {
        this.setState({
          completecount : this.state.completecount + 1,
        });
        this.props.pointchange(item.difficulty * 10);
        this.props.coinchange(item.difficulty * 10);
      } else {
        this.setState({
          completecount : this.state.completecount - 1,
        });
        this.props.pointchange(item.difficulty * (-10));
        this.props.coinchange(item.difficulty * (-10));
      }
      this.changecomplete(item);
    }
    }
  />

{/* <TouchableOpacity style={{ backgroundColor:'#ffdc34' }}
    onPress = {() => {
      this.props.navigation.navigate('ModifyTodos', {
        title : item.title,
      })
    }}
    >
        <Text style = {{ color : '#110133' }}>수정</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={{ backgroundColor:'#110133' }}
    onPress = {() => {
      console.log(this.props.todosarr);
      console.log(item.title)
      for(let i=0; i<this.props.todosarr.length; i++){
        if(this.props.todosarr[i].title === item.title){
          this.props.todosarr.splice(i,1);
          const newtodosarr = this.props.todosarr;
          this.props.savetodos(newtodosarr);
          console.log('newtodosarr',newtodosarr);

          Alert.alert(
            '삭제하시겠습니까?',
            '',
            [
              {
                text: '삭제',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: '취소', onPress: () => {
                this.props.navigation.navigate('Habits')
              }
              }
            ],
            {cancelable: false},
          );
          this.props.navigation.navigate('Todos')
        }
      }

    }}
    >
        <Text>삭제</Text>
      </TouchableOpacity> */}
      </View>

      <View style = {styles.habits} 
        onTouchEnd = {() => {
          this.props.navigation.navigate('ModifyTodos', {
            title : item.title,
          })
        }} >
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.dateStart.slice(0, 10)}~{item.dateEnd.slice(0, 10)}</Text>
          <Text style = {styles.habitdesc}>{item.description}</Text>

      </View >

      {/* <View>
      <CheckBox value = {item.alarm}/>
      </View> */}

      </View>

  }

  public render() {

  const { navigate } = this.props.navigation;
  return (

      <View style = {styles.container}>

      <View style ={{ flex : 7 }}>
          <Characterinfo/>
        </View>

      <View style = { { flex : 2, flexDirection : 'row', justifyContent : 'space-between', backgroundColor : 'white'} }>
      <TouchableOpacity style = {{ backgroundColor : 'transparent' }}
          onPress = {() => {
             console.log('전체보기');
            this.setState({
              totallist : true,
            });
          }}>
           <Text style = {{ alignSelf : 'center', color : '#110133', fontSize : 18 }}>View all</Text>
        </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor:'transparent' }}
          onPress={() =>
          this.props.navigation.navigate('AddTodos')}>
            <MaterialIcons name = 'playlist-add' size = {34} color = '#ffdc34' />
          </TouchableOpacity>

      </View>

      <View  style = {{ flex : 20, backgroundColor : 'white'}}>

          <View onTouchEnd = {() => {
            this.setState({
              totallist : false,
            })
            console.log('datepicker touch')}}
            onTouchCancel = {() =>{
              this.setState({
                totallist : true,
              })
            }}
            >
            <TodoDatePicker />
          </View>

          <ScrollView style={styles.scrollView}>

        {this.props.todosarr.map((item) => {
          let start = this.calculus(item.dateStart);
          let end = this.calculus(item.dateEnd);
          if(this.state.totallist){
            return this.todos(item);
          } 
         else {
            if (this.props.date >= start && this.props.date <= end) {
              return this.todos(item);
            
          }

        }
    })}
    </ScrollView>

      <View>
        <Text> 완료 {this.state.completecount}건, 미완료 {this.props.todosarr.length - this.state.completecount} 건</Text>
      </View>

      </View>

      </View>

    );
}
}

const mapStateToProps = (state) => {
  return {
    todosarr : state.todosreducer.todosarr,
    date : state.datereducer.date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pointchange : value => dispatch(pointchange(value)),
    coinchange : value => dispatch(coinchange(value)),
    healthchange : value => dispatch(healthchange(value)),
    savetodos : (arr) => {
      dispatch(savetodos(arr));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    width : '100%',
    backgroundColor : '#110133'
  },
  scrollView: {
    // marginHorizontal: 20,
  },
  onehabit : {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    flexDirection : 'row',
    backgroundColor : '#ffdc34',
    height : 70,
  },
  positive: {
    flex: 1,
  },
  // negative: {
  //   flex: 1,
  // },
  habits: {
    flex: 7,
  },
  habittitle :{
    flex : 2,
    fontSize : 20,
    color : '#110133',
  },
  habitdesc : {
    flex : 1,
    fontSize : 14,
    color : '#110133',
  },
});