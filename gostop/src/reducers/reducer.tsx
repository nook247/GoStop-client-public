import { DECREMENT, FETCH_CHARACTERINFO, FETCH_HABITSINFO, INCREMENT, SET_DIFF, TodosAction } from '../actions/characterinfoaction';

export interface TodosState {
  healthvalue : number;
  pointsvalue : number;
  coinsvalue : number;
  diff : number;
  level : number;
  habits : Habit[];
}

export interface Habit {
  title : string;
  desc : string;
  alarm : boolean;
}

const initialState : TodosState = {
  healthvalue : 0,
  pointsvalue : 0,
  coinsvalue : 0,
  diff: 10,
  level : 0,
  habits : [],
};

const reducer = (state : TodosState = initialState, action : TodosAction): TodosState => {
  switch (action.type){
    case INCREMENT:
      let incrementuserdata = {
        id : 1,
        name : 'tube',
        email : '369369@gmail.com',
        password : 12345,
        level : 10,
        coin : state.coinsvalue + action.value,
        point : state.pointsvalue + action.value,
        health : state.healthvalue,
        status : true,
        userCode : 1,
      };
      console.log('reducer-increment', state);
      fetch('http://localhost:3000/users/1', {
        method : 'PUT',
        body : JSON.stringify(incrementuserdata),
        headers : {
          'Content-Type' : 'application/json',
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
        .then(() => console.log('increment put 성공'));
        }
      });

      return Object.assign({}, state, {
        pointsvalue : state.pointsvalue + action.value,
        coinsvalue : state.coinsvalue + action.value,
      });


    case DECREMENT:
      console.log('reducer-decrement', state);

      let decrementuserdata = {
        id : 1,
        name : 'tube',
        email : '369369@gmail.com',
        password : 12345,
        level : 10,
        coin : state.coinsvalue,
        point : state.pointsvalue,
        health : state.healthvalue - action.value,
        status : true,
        userCode : 1,
      };
      console.log('reducer-increment', state);
      fetch('http://localhost:3000/users/1', {
        method : 'PUT',
        body : JSON.stringify(decrementuserdata),
        headers : {
          'Content-Type' : 'application/json',
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
          .then(() => console.log('decrement put 성공'));
        }
      });
      return Object.assign({}, state, {
        healthvalue : state.healthvalue - action.value,
      });
    case SET_DIFF:
      return Object.assign({}, state, {
        diff : action.diff,
      });
    case FETCH_CHARACTERINFO:
      return Object.assign({}, state, {
        healthvalue : action.healthvalue,
        pointsvalue : action.pointsvalue,
        coinsvalue : action.coinsvalue,
        level : action.level,
      });
    case FETCH_HABITSINFO:
      var newhabits = state.habits.slice();
      var obj = { title : action.title, desc : action.desc, alarm : action.alarm};
      newhabits.push(obj);
      return Object.assign({}, state, {
        habits : newhabits,
      });
    default:
      return state;
  }
};

export default reducer;
