export const INCREMENT = 'INCREMENT' as const;
export const DECREMENT = 'DECREMENT' as const;
export const SET_DIFF = 'SET_DIFF' as const;
export const FETCH_CHARACTERINFO = 'FETCH_CHARACTERINFO' as const;
export const FETCH_HABITSINFO = 'FETCH_HABITSINFO' as const;

export function increment(value : number) {
  return {
    type : INCREMENT,
    value : value
  }
}
export function decrement(value : number) {
  return {
    type : DECREMENT,
    value : value,
  };
}

export function setDiff(diffValue : number) {
  return {
    type : SET_DIFF,
    diff : diffValue,
  };
}

export function fetchCharacterInfo(health : number, point : number, coin :number, level : number) {
  return {
    type : FETCH_CHARACTERINFO,
    healthvalue : health,
    pointsvalue : point,
    coinsvalue : coin,
    level : level,
  };
}

export function fetchHabitsInfo(title : string, desc : string, alarm : boolean) {
  return {
    type : FETCH_HABITSINFO,
     title  : title,
     desc  : desc,
     alarm  : alarm,
  };

}

export type TodosAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof setDiff>
  | ReturnType<typeof fetchCharacterInfo>
  | ReturnType<typeof fetchHabitsInfo>;
