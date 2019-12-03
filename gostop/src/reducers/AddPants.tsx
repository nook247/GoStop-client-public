
// tslint:disable-next-line: class-name
export interface imageState {
  pantss : any;
}

const initialState : imageState = {
  pantss: [],
};

import * as types from '../actions/types';

export default function uri5(state = initialState, action) {
  if (action.type === types.ADD_ITEM2) {
    initialState.pantss.push(action.arr2);
    return Object.assign({}, state, initialState);
  }
  return state;
}
