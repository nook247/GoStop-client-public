
// tslint:disable-next-line: class-name
export interface imageState {
  uri : any;
}
const initialState : imageState = {
  uri: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/head1.png',
};

import * as types from '../actions/types';

export default function uri(state : imageState = initialState, action) {
  if (action.type === types.IMAGE_CHANGE) {
    return Object.assign({}, state, {
      uri: action.uri,
    });
  }
  return state;
}
