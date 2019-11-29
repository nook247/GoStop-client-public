import React, { Component } from 'react';
import { CheckBox, StyleSheet, Text, View, AsyncStorage, Button, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {  coinchange, healthchange, pointchange  } from '../actions/characterinfoaction';
import  DatePicker  from './DatePicker';
import fakeserver from '../fakeserver';
import Characterinfo from './characterinfo';
import  savetodos  from '../actions/todosaction';

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
}

class Todos extends Component<any, TodosStates> {
  constructor(props) {
    super(props);
    this.state = {
      // todos : [],
      completecount : 0,
    };
  }

  public changecomplete(item) {
    const todoData = {
      completed: item.completed,
    };
    fetch(`${fakeserver}/todos/${item.id}`, {
      method : 'PATCH',
      body : JSON.stringify(todoData),
      headers : {
        'Content-Type' : 'application/json',
      },
    }).then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
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
    // console.log('storage 저장된 token이야', token);
    let header = new Headers();
    header.append('Cookie', token)
    const myInit = {
      method : 'GET',
      headers : header,
    }
    fetch(`${fakeserver}/users/todos`, myInit).then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json()
        .then(data => {

          if(!data.todos.length){
            let initState = {
              id : '',
              title : '제목을 입력하세요',
              desc : '설명을 입력하세요',
              alarm : true,
              completed : true,
              difficulty : 3,
            }
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
  public render() {
    console.log(this.props.todosarr)
    const { navigate } = this.props.navigation;
    return (
    
      <View style = {styles.container}>

      <View style ={{ flex : 5 }}>
          <Characterinfo/>
        </View>

      <View style = { { flex : 1 } }>
          <Button
          title='Add todos'
          onPress={() => navigate('AddTodos')}
          />
      </View>

      <View style = {{ flex : 9 }}>


          <View>
            <DatePicker />
          </View>
    
        {this.props.todosarr.map((item) => {
          return <View style = {styles.onehabit} key = {item.description}>

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
            // action 이 들어간다.
          }
          }
        />

     <TouchableOpacity style={{ backgroundColor:'skyblue' }}
          onPress = {() => {
            this.props.navigation.navigate('ModifyTodos', {
              title : item.title,
            })
          }}
          >
              <Text>수정</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ backgroundColor:'skyblue' }}
          onPress = {() => {
            console.log(this.props.todosarr);
            console.log(item.title)
            for(let i=0; i<this.props.todosarr.length; i++){
              if(this.props.todosarr[i].title === item.title){
                this.props.todosarr.splice(i,1);
                const newtodosarr = this.props.todosarr;
                this.props.savetodos(newtodosarr)
                console.log('newtodosarr',newtodosarr)
                // this.props.navigation.navigate('Todos')
              }
            } 
            
          }}
          >
              <Text>삭제</Text>
            </TouchableOpacity> */}
            </View>





      <View style = {styles.habits}>
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.description}</Text>

      </View >

      <View>
      <CheckBox value = {item.alarm}/>
      </View>

      </View>
 




        })
    }
  



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
  },
  onehabit : {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection : 'row',
    height : 70,
  },
  positive: {
    flex: 1,
  },
  negative: {
    flex: 1,
  },
  habits: {
    flex: 6,
  },
  habittitle :{
    flex : 2,
    fontSize : 20,
  },
  habitdesc : {
    flex : 1,
    fontSize : 14,
  },
});