import { GETUSER, GetuserAction } from '../actions/getuseraction';
import { COINCHANGE, HEALTHCHANGE, POINTCHANGE } from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';
import { AsyncStorage } from 'react-native';

export interface userState {
  id : string;
  email : string;
  name : string;
  userCode : number;
  level : number;
  health : number;
  point : number;
  coin : number;
  token : string;
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
  token : '',
};

// async function fetchInit (data){
//   let token = '';
//   await AsyncStorage.getItem('token', (err, result) => {
//       token = result
//   })
//   let header = new Headers();
//   header.append('Cookie', token)
//   header.append('Content-Type', 'application/json')
  
//   const myInit = {
//       method : 'PATCH',
//       body: JSON.stringify(data),
//       headers : header,
//       Cookie : token,
//   }
//   return myInit;
// }


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
        token : action.token,
      });
    case POINTCHANGE:

      var changepoint = state.point + action.value;
      var changelevel = state.level;
      var changehealth = state.health;

      var levelpoint = 200 + 50 * (state.level - 1);
      if ( changepoint >= levelpoint) {
        changepoint = changepoint - levelpoint;
        changehealth = 200;
        changelevel = changelevel + 1;
        alert('레벨업하였습니다!');
      };

      var pointchangedata = {
        point : changepoint,
        health : changehealth,
        level : changelevel,
      };
   
      fetch(`${fakeserver}/users/${state.id}`, {
        method : 'PATCH',
        body : JSON.stringify(pointchangedata),
        headers : {
          'Content-Type' : 'application/json',
          'Cookie' : state.token,
        },
 
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
        .then(() => console.log('point patch 성공'));
        }
      });
      
      return Object.assign({}, state, pointchangedata,
        );
      
    case COINCHANGE:
      const coinchangedata = {
        coin : state.coin  + action.value,
      };
    
      fetch(`${fakeserver}/users/${state.id}`, {
        method : 'PATCH',
        body : JSON.stringify(coinchangedata),
        headers : {
          'Content-Type' : 'application/json',
          'Cookie' : state.token,
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
        .then(() => console.log('coin patch 성공'));
        }
      });

      return Object.assign({}, state, coinchangedata,
        );

    case HEALTHCHANGE:
      var changepoint = state.point;
      var changelevel = state.level;
      var changehealth = state.health - action.value;

      var levelpoint = 200 + 50 * (state.level - 1);
      if ( changehealth <= 0) {
        changepoint = 0;
        changehealth = 200 + changehealth;
        changelevel = changelevel - 1;
        alert('체력이 소진되어 레벨이 감소하였습니다');
      };

      var healthchangedata = {
        point : changepoint,
        health : changehealth,
        level : changelevel,
      };
      fetch(`${fakeserver}/users/${state.id}`, {
        method : 'PATCH',
        body : JSON.stringify(healthchangedata),
        headers : {
          'Content-Type' : 'application/json',
          'Cookie' : state.token,
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
          .then(() => console.log('health patch 성공'));
        }
      });
      return Object.assign({}, state, healthchangedata,
        );

    default:
      return state;
  }
};

export default getuserreducer;
