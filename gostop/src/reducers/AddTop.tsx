
// tslint:disable-next-line: class-name
export interface imageState {
  tops : any;
}

const initialState : imageState = {
  tops: [],
};

import * as types from '../actions/types';

export default function uri4(state = initialState, action) {
  if (action.type === types.ADD_ITEM1) {
    initialState.tops.push(action.arr1);
    return Object.assign({}, state, initialState);
  }
  return state;
}
