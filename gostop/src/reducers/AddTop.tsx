
// tslint:disable-next-line: class-name
export interface imageState {
  tops : any;
}

const initialState : imageState = {
  tops: [],
};

import * as types from '../actions/types';

export default function tops(state = initialState, action) {

  switch (action.type){

    case types.ADD_ITEM1: {
      return {
        ...state,
        tops: [...state.tops, action.arr1],
      };
    }
    default:
      return state;
  }
}
