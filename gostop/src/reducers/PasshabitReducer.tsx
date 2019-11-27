import { PasshabitAction, PASSHABIT } from '../actions/passhabitaction';

export interface HabitState {
  id : string;
  title : string;
  description : string;
  alarmId : string;
  difficulty : number;
  positive : boolean;
}

const initialState :  HabitState = {
  id : 'aaa',
  title : 'aaa',
  description : 'aaa',
  alarmId : 'aaa',
  difficulty : 1,
  positive : true,
};

const passhabitreducer = (state : HabitState = initialState, action : PasshabitAction): HabitState => {
  switch (action.type){
    case PASSHABIT:
      return Object.assign({}, state, {
        id : action.id,
        title : action.title,
        description : action.description,
        alarmId :action.alarmId,
        difficulty :action.difficulty,
        positive : action.positive,
      });
  default:
    return state;
  }
}

export default passhabitreducer;
