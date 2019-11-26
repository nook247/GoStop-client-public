import React, { Component } from 'react';
import { CheckBox, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {  coinchange, healthchange, pointchange  } from '../actions/characterinfoaction';
import  DatePicker  from './DatePicker';
import fakeserver from '../fakeserver';

export interface Todo {
  id : string;
  title : string;
  desc : string;
  alarm : boolean;
  completed : boolean;
  difficulty : number;
}

interface TodosStates {
  todos : Todo[];
  completecount : number;
}

class Todos extends Component<any, TodosStates> {
  constructor(props) {
    super(props);
    this.state = {
      todos : [],
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
    console.log('storage 저장된 token이야', token);
    let header = new Headers();
    header.append('Cookie', token)
    const myInit = {
      method : 'GET',
      headers : header,
    }
    fetch(`${fakeserver}/users/todos`, myInit).then((res) => {
      if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.json()
        .then(todosdata => {
          const newtodos = this.state.todos.slice();

          if(!todosdata.todos.length){
            let initState = {
              id : '',
              title : '제목을 입력하세요',
              desc : '설명을 입력하세요',
              alarm : true,
              completed : true,
              difficulty : 3,
            }
            newtodos.push(initState)
          } else {

          todosdata.todos.map(elem => {
            newtodos.push({ id : elem.id, title : elem.title, desc : elem.description,
              alarm : elem.alarm, completed : elem.completed, difficulty : elem.difficulty });
            if (elem.completed) {
              this.setState({
                completecount : this.state.completecount + 1,
              });
            }
          });
        }

          this.setState({
            todos: newtodos,
          });
        },

            );
      } else { // 실패를 알리는 HTTP 상태 코드면
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));

  }
  public render() {
    return (
            <View style = {styles.container}>
                           <View>
                    <DatePicker />
                </View>

        {this.state.todos.map((item) => {
          const index = this.state.todos.indexOf(item);
          return   <View style = {styles.onehabit} key = {item.title}>

<CheckBox
      value = {item.completed}
      onValueChange={ () => {
        const newtodos = this.state.todos;
        newtodos[index].completed = !newtodos[index].completed;
        this.setState({
          todos : newtodos,
        });
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

      <View style = {styles.habits}>
          <Text style = {styles.habittitle}>{item.title}</Text>
          <Text style = {styles.habitdesc}>{item.desc}</Text>

      </View >

      <View>
      <CheckBox value = {item.alarm}/>
      </View>

      </View>;

        })
    }
      <View>
        <Text> 완료 {this.state.completecount}건, 미완료 {this.state.todos.length - this.state.completecount} 건</Text>
      </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pointchange : value => dispatch(pointchange(value)),
    coinchange : value => dispatch(coinchange(value)),
    healthchange : value => dispatch(healthchange(value)),
  };
};
export default connect(null, mapDispatchToProps)(Todos);

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