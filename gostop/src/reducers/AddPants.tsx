
// tslint:disable-next-line: class-name
export interface imageState {
  pantss : any;
}

const initialState : imageState = {
  pantss: [],
};

import * as types from '../actions/types';

export default function pantss(state = initialState, action) {

  switch (action.type){

    case types.ADD_ITEM2: {
      return {
        ...state,
        pantss: [...state.pantss, action.arr2],
      };
    }
    default:
      return state;
  }
}
