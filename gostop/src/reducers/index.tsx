import { combineReducers } from 'redux';
import changeReducer from './Itemchange';
import changeReducer1 from './Itemchange1';
import changeReducer2 from './Itemchange2';
import changeReducer3 from './Itemchange3';

export default combineReducers({
  changeReducer,
  changeReducer1,
  changeReducer2,
  changeReducer3,
});
