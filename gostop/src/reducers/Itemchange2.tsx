// tslint:disable-next-line: class-name
export interface imageState {
  uri2 : any;
}
const initialState2 : imageState = {
  // tslint:disable-next-line: max-line-length
  uri2: 'http://pngimg.com/uploads/socks/socks_PNG8244.png',
};

import * as types from '../Actions/types';

export default function uri2(state : imageState = initialState2, action) {
  if (action.type === types.IMAGE_CHANGE2) {
    return Object.assign({}, state, {
      uri2: action.uri2,
    });
  }
  return state;
}
