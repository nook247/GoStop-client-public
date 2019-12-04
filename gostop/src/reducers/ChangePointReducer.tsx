import { COINCHANGE, FETCH_CHARACTERINFO, FETCH_HABITSINFO, HabitsAction, HEALTHCHANGE, POINTCHANGE} from '../actions/characterinfoaction';
import fakeserver from '../fakeserver';

export interface HabitsState {
  name : string;
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

const initialState : HabitsState = {
  name : '',
  healthvalue : 0,
  pointsvalue : 0,
  coinsvalue : 0,
  diff: 0,
  level : 0,
  habits : [],
};

const changepointreducer = (state : HabitsState = initialState, action : HabitsAction): HabitsState => {
  switch (action.type){
  //   case POINTCHANGE:
  //     const pointchangedata = {
  //       point : state.pointsvalue + action.value,
  //     };
  //     fetch(`${fakeserver}/users/1`, {
  //       method : 'PATCH',
  //       body : JSON.stringify(pointchangedata),
  //       headers : {
  //         'Content-Type' : 'application/json',
  //       },
  //     }).then((res) => {
  //       if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
  //         res.json()
  //       .then(() => console.log('point patch 성공'));
  //       }
  //     });
      
  //     return Object.assign({}, state, {
  //       pointsvalue : state.pointsvalue + action.value,
  //     });
      
  //   case COINCHANGE:
  //     const coinchangedata = {
  //       coin : state.coinsvalue  + action.value,
  //     };
    
  //     fetch(`${fakeserver}/users/1`, {
  //       method : 'PATCH',
  //       body : JSON.stringify(coinchangedata),
  //       headers : {
  //         'Content-Type' : 'application/json',
  //       },
  //     }).then((res) => {
  //       if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
  //         res.json()
  //       .then(() => console.log('coin patch 성공'));
  //       }
  //     });

  //     return Object.assign({}, state, {
  //       coinsvalue : state.coinsvalue + action.value,
  //     });

  //   case HEALTHCHANGE:
  //     const healthchangedata = {
  //       health : state.healthvalue - action.value,
  //     };
  //     fetch(`${fakeserver}/users/1`, {
  //       method : 'PATCH',
  //       body : JSON.stringify(healthchangedata),
  //       headers : {
  //         'Content-Type' : 'application/json',
  //       },
  //     }).then((res) => {
  //       if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
  //         res.json()
  //         .then(() => console.log('health patch 성공'));
  //       }
  //     });
  //     return Object.assign({}, state, {
  //       healthvalue : state.healthvalue - action.value,
  //     });

    // case FETCH_CHARACTERINFO:
    //   return Object.assign({}, state, {
    //     name : action.name,
    //     healthvalue : action.healthvalue,
    //     pointsvalue : action.pointsvalue,
    //     coinsvalue : action.coinsvalue,
    //     level : action.level,
    //   });

    default:
      return state;
  }
};

export default changepointreducer;
