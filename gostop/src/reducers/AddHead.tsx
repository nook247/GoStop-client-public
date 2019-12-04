
// tslint:disable-next-line: class-name
export interface imageState {
  heads : any;
}
const initialState : imageState = {
  heads: [],
};

import * as types from '../actions/types';

export default function heads(state = initialState, action) {

  switch(action.type){

    case types.ADD_ITEM: {
      return {
        ...state,
        heads: [...state.heads, action.arr],
      };
    }
    default:
      return state;
  }

  // if (action.type === types.ADD_ITEM) {
  //   initialState.heads.push(action.arr);
  //   return Object.assign({}, state, initialState);
  // }
  // return state

}
