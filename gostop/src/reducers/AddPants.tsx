
// tslint:disable-next-line: class-name
export interface imageState {
  pantss : any;
}

const initialState : imageState = {
  pantss: [],
};

import * as types from '../actions/types';

export default function pantss(state = initialState, action) {

  switch(action.type){

    case types.ADD_ITEM2: {
      return {
        ...state,
        pantss: [...state.pantss, action.arr2],
      };
    }
    default:
      return state;
  }
  // if (action.type === types.ADD_ITEM2) {
  //   initialState.pantss.push(action.arr2);
  //   return Object.assign({}, state, initialState);
  // }
  // return state;
}
