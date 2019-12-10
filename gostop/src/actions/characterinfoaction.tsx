export const POINTCHANGE = 'POINTCHANGE' as const;
export const HEALTHCHANGE = 'HEALTHCHANGE' as const;
export const COINCHANGE = 'COINCHANGE' as const;
export const FETCH_CHARACTERINFO = 'FETCH_CHARACTERINFO' as const;
export const FETCH_HABITSINFO = 'FETCH_HABITSINFO' as const;

export function pointchange(value : number) {
  return {
    type : POINTCHANGE,
    value : value
  }
}
export function coinchange(value : number) {
  return {
    type : COINCHANGE,
    value : value,
  };
}
export function healthchange(value : number) {
  return {
    type : HEALTHCHANGE,
    value : value,
  };
}

export function fetchCharacterInfo(name : string, health : number, point : number, coin :number, level : number) {
  return {
    type : FETCH_CHARACTERINFO,
    name : name,
    healthvalue : health,
    pointsvalue : point,
    coinsvalue : coin,
    level : level,
  };
}

export type HabitsAction =
  | ReturnType<typeof pointchange>
  | ReturnType<typeof coinchange>
  | ReturnType<typeof healthchange>
  | ReturnType<typeof fetchCharacterInfo>;
