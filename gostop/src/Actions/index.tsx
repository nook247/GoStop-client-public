import * as types from './types';

export function imagechange(uristate) {
  return  {
    type: types.IMAGE_CHANGE,
    // tslint:disable-next-line: object-shorthand-properties-first
    uri: uristate,
  };
}

export function imagechange1(uristate1) {
  return  {
    type: types.IMAGE_CHANGE1,
    // tslint:disable-next-line: object-shorthand-properties-first
    uri1: uristate1,
  };
}

export function imagechange2(uristate2) {
  return  {
    type: types.IMAGE_CHANGE2,
    // tslint:disable-next-line: object-shorthand-properties-first
    uri2: uristate2,
  };
}

export function imagechange3(uristate3) {
  return  {
    type: types.IMAGE_CHANGE3,
    // tslint:disable-next-line: object-shorthand-properties-first
    uri3: uristate3,
  };
}
