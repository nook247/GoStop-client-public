// tslint:disable-next-line: class-name
export interface imageState {
  uri1 : any;
}
const initialState1 : imageState = {
  uri1: 'https://totalitems.s3.ap-northeast-2.amazonaws.com/top1.png',
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
