import { GETUSER, GetuserAction } from '../actions/getuseraction';
import { COINCHANGE, FETCH_CHARACTERINFO, FETCH_HABITSINFO, HabitsAction, HEALTHCHANGE, POINTCHANGE, SET_DIFF } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';

export interface userState {
  id : string;
  email : string;
  name : string;
  userCode : number;
  level : number;
  health : number;
  point : number;
  coin : number;
}

const initialState : userState = {
  id : '',
  email : '',
  name : '',
  userCode : null,
  level : null,
  health : null,
  point : null,
  coin : null,
};

const getuserreducer = (state : userState = initialState, action : GetuserAction) : userState =>{
  switch (action.type){
    case GETUSER:
      return Object.assign({}, state, {
        id : action.id,
        email : action.email,
        name : action.name,
        userCode : action.userCode,
        level : action.level,
        health : action.health,
        point : action.point,
        coin : action.coin,
      });
    case POINTCHANGE:
      const pointchangedata = {
        point : state.point + action.value,
      };
      fetch(`${fakeserver}/users/${state.id}`, {
        method : 'PATCH',
        body : JSON.stringify(pointchangedata),
        headers : {
          'Content-Type' : 'application/json',
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
        .then(() => console.log('point patch 성공'));
        }
      });
      
      return Object.assign({}, state, {
        point : state.point + action.value,
      });
      
    case COINCHANGE:
      const coinchangedata = {
        coin : state.coin  + action.value,
      };
    
      fetch(`${fakeserver}/users/${state.id}`, {
        method : 'PATCH',
        body : JSON.stringify(coinchangedata),
        headers : {
          'Content-Type' : 'application/json',
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
        .then(() => console.log('coin patch 성공'));
        }
      });

      return Object.assign({}, state, {
        coin : state.coin + action.value,
      });

    case HEALTHCHANGE:
      const healthchangedata = {
        health : state.health - action.value,
      };
      fetch(`${fakeserver}/users/${state.id}`, {
        method : 'PATCH',
        body : JSON.stringify(healthchangedata),
        headers : {
          'Content-Type' : 'application/json',
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
          .then(() => console.log('health patch 성공'));
        }
      });
      return Object.assign({}, state, {
        health : state.health - action.value,
      });

    default:
      return state;
  }
};

export default getuserreducer;
