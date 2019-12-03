// tslint:disable-next-line: class-name
export interface imageState {
  uri2 : any;
}
const initialState2 : imageState = {
  // tslint:disable-next-line: max-line-length
  uri2: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/bottm1.png',
};

import * as types from '../actions/types';

export default function uri2(state : imageState = initialState2, action) {
  if (action.type === types.IMAGE_CHANGE2) {
    return Object.assign({}, state, {
      uri2: action.uri2,
    });
  }
  return state;
}
