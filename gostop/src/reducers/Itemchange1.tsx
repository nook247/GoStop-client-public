// tslint:disable-next-line: class-name
export interface imageState {
  uri1 : any;
}
const initialState1 : imageState = {
  uri1: 'http://pngimg.com/uploads/polo_shirt/polo_shirt_PNG8147.png',
};

import * as types from '../actions/types';

export default function uri1(state : imageState = initialState1, action) {
  if (action.type === types.IMAGE_CHANGE1) {
    return Object.assign({}, state, {
      uri1: action.uri1,
    });
  }
  return state;
}
