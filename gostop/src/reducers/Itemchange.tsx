
// tslint:disable-next-line: class-name
export interface imageState {
  uri : any;
}
const initialState : imageState = {
  uri: 'http://pngimg.com/uploads/cap/cap_PNG5675.png',
};

import * as types from '../Actions/types';

export default function uri(state : imageState = initialState, action) {
  if (action.type === types.IMAGE_CHANGE) {
    return Object.assign({}, state, {
      uri: action.uri,
    });
  }
  return state;
}
