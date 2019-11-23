// tslint:disable-next-line: class-name
export interface imageState {
  uri3 : any;
}
const initialState3 : imageState = {
  // tslint:disable-next-line: max-line-length
  uri3: 'http://pngimg.com/uploads/pokemon/pokemon_PNG122.png',
};

import * as types from '../Actions/types';

export default function uri3(state : imageState = initialState3, action) {
  if (action.type === types.IMAGE_CHANGE3) {
    return Object.assign({}, state, {
      uri3: action.uri3,
    });
  }
  return state;
}
