
// tslint:disable-next-line: class-name
export interface imageState {
  heads : any;
}
const initialState : imageState = {
  heads: [],
};

import * as types from '../actions/types';

export default function uri3(state = initialState, action) {
  if (action.type === types.ADD_ITEM) {
    initialState.heads.push(action.arr);
    return Object.assign({}, state, initialState);
  }
  return state;

}
