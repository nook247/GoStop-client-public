import { Habit, Habitarr, SAVEHABIT, SavehabitAction } from '../actions/habitaction';

const initialhabit : Habit = {
  id : 'aaa',
  title : 'aaa',
  description : 'aaa',
  // alarmId : 'aaa',
  difficulty : 1,
  positive : true,
};

const initialState : Habitarr = {
  habitarr : [initialhabit],
};

const habitreducer = (state : Habitarr = initialState, action : SavehabitAction): Habitarr =>{
  switch (action.type){
    case SAVEHABIT:
      return Object.assign({}, state, {
        habitarr : action.habitarr,
      });
    default:
      return state;
  }
};

export default habitreducer;
