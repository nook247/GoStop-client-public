import React, { Component } from 'react';
import { CheckBox, StyleSheet, Text, View, AsyncStorage, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import {  coinchange, healthchange, pointchange  } from '../actions/characterinfoaction';
import  TodoDatePicker  from './tododatepicker';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import  savetodos  from '../actions/todosaction';
import { MaterialIcons } from '@expo/vector-icons';
import { getuser } from '../actions/getuseraction';

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
    .then( async (res) => {
      if (res.status === 200 || res.status === 201) {
        res.json()
            .then(() => console.log('checkbox put 성공'));
      } else if(res.status === 401){
          console.log('patch 실패?',res.status)
      }
    });
  }

  public async componentDidMount() {
    // complete 갯수 맞춰주기
    const { navigation } = this.props;
    navigation.addListener('didFocus', () => {
      this.setState({
        completecount : 0,
      })
      for(let i=0; i<this.props.todosarr.length; i++){
        if (this.props.todosarr[i].completed) {
          this.setState({
            completecount : this.state.completecount + 1,
          });
        }
      }
    });
    // fetch
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
            let initState = {
            id : '',
            title : '제목을 입력하세요',
            description : '설명을 입력하세요',
            // alarmId : 'alamId',
            difficulty : 1,
            dateStart : '2000-01-01',
            dateEnd : '2999-12-31',
            completed : false,
            }
             //초기 상태 일단 포스트 보내고, 저장한다. 
            let header = new Headers();
            header.append('Cookie', token)
            header.append('Content-Type', 'application/json')
            const postInit = {
                method : 'POST',
                body: JSON.stringify(initState),
                headers : header,
                Cookie : token
            }
            fetch(`${fakeserver}/todos`, postInit)
            .then(() => console.log('initial todos post ok'))
            .catch(error => console.error('왜안되니?', error));
          this.props.savetodos([initState]);
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

public todos(item, index){ 
  return  <View style = {styles.onehabit} key = {index}>

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

      </View>

      <View style = {styles.habits} 
        onTouchEnd = {() => {
          this.props.navigation.navigate('ModifyTodos', {
            title : item.title,
          })
        }} >
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.tododate}>{item.dateStart.slice(0, 10)}~{item.dateEnd.slice(0, 10)}</Text>
          <Text style = {styles.habitdesc}>{item.description}</Text>

      </View >
      </View>
  }

  public render() {

  const { navigate } = this.props.navigation;
  return (

      <View style = {styles.container}>

      <View style ={{ flex : 7 }}>
          <Characterinfo/>
        </View>

      <View style = { { flex : 2, flexDirection : 'row', backgroundColor : '#ffdc34', justifyContent : 'space-between',
          borderBottomColor : '#F4F4F5', borderBottomWidth : 1,  alignItems : 'center' } }>
      <Text style={styles.buttonText} onPress = {() => {
              this.setState({
              totallist : true,
            });
            }}>전체 목록</Text>
        <Text style = {styles.doneText}> 완료 {this.state.completecount}건 미완료 {this.props.todosarr.length - this.state.completecount}건</Text>

<View style = {styles.date} onTouchEnd = {() => {
            this.setState({
              totallist : false,
            });
          }}
            onTouchCancel = {() => {
              this.setState({
                totallist : true,
              });
            }}
            >
            <TodoDatePicker />
          </View>
       

      </View>

      <View  style = {{ flex : 20, backgroundColor : 'white'}}>

          <ScrollView style={styles.scrollView}>

        {this.props.todosarr.map((item, index) => {
          let start = this.calculus(item.dateStart);
          let end = this.calculus(item.dateEnd);
          if(this.state.totallist){
            return this.todos(item, index);
          } 
         else {
            if (this.props.date >= start && this.props.date <= end) {
              return this.todos(item, index);
            
          }

        }
    })}
            <View style = {{ flex : 10, backgroundColor : 'transparent', height : 100 }}></View>
      </ScrollView>

      </View>

      <View style = {{ position: 'absolute', backgroundColor: 'transparent', right: 165, bottom: 10 }}>
          <TouchableOpacity style={styles.addBtn}
              onPress={() => this.props.navigation.navigate('AddTodos')} >
            <MaterialIcons name = 'playlist-add' size = {52} color = 'white' />
          </TouchableOpacity>
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
    getuser : (id, email, name, userCode, level, health, point, coin, token) => {
      dispatch(getuser(id, email, name, userCode, level, health, point, coin, token))
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : '100%',
  },
  doneText : {
    flex : 4,
    color: '#110133',
    fontSize : 15,
    fontWeight : 'bold',
    marginHorizontal : 17,
  },
  buttonText: {
    flex : 1,
    color: '#110133',
    fontSize: 15,
    fontWeight : 'bold',
    paddingLeft : 10,
  },
  date : {
    flex : 3,
  },
  scrollView: {
  },
  onehabit : {
    flexDirection : 'row',
    borderBottomColor : '#F4F4F5',
    borderBottomWidth : 1,
  },
  positive: {
    flex: 1,
    backgroundColor : '#ffdc34',
    justifyContent : 'center',
    alignItems : 'center',
  },
  negative: {
    flex: 1,
    backgroundColor : '#ffdc34',
    justifyContent : 'center',
    alignItems : 'center',
  },
  habits: {
    flex: 6,
    paddingHorizontal : 17,
    paddingVertical : 10,
  },
  habittitle :{
    flex : 1,
    fontSize : 20,
    color : 'black',
  },
  tododate : {
    flex : 1,
    fontSize : 14,
    color : 'black',
  },
  habitdesc : {
    flex : 1,
    fontSize : 14,
    color : 'silver',
  },
  addcontainer : {
    flex : 2,
    backgroundColor : 'white',
    justifyContent : 'flex-end',
    alignItems : 'center',
    flexDirection : 'row',
    margin : 20,
  },
  addBtn : {
    backgroundColor:'#110133',
    marginRight : 15,
    borderRadius : 10,
    borderWidth : 1,
    borderColor : '#110133',
  },
});
