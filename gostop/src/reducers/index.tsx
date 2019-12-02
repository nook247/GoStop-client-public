import { combineReducers } from 'redux';
import changeReducer from './Itemchange';
import changeReducer1 from './Itemchange1';
import changeReducer2 from './Itemchange2';
import changeReducer3 from './Itemchange3';
import changepointreducer from './ChangePointReducer';
import passhabitreducer from './PasshabitReducer';
import getuserreducer from './GetuserReducer';
import habitreducer from './HabitReducer';
import todosreducer from './TodosReducer';
import rewardreducer from './RewardReducer';
import datereducer from './DateReducer';
// 추가
import StartDateReducer from './StartDateReducer'
import EndDateReducer from './EndDateReducer'

export default combineReducers({
  changeReducer,
  changeReducer1,
  changeReducer2,
  changeReducer3,
  changepointreducer,
  todosreducer,
  passhabitreducer,
  getuserreducer,
  habitreducer,
  rewardreducer,
  datereducer,
  StartDateReducer,
  EndDateReducer
});

// StartDateReducer, EndDateReducer 추가로 combine