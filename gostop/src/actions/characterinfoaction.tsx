export const POINTCHANGE = 'POINTCHANGE' as const;
export const HEALTHCHANGE = 'HEALTHCHANGE' as const;
export const COINCHANGE = 'COINCHANGE' as const;

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


export type HabitsAction =
  | ReturnType<typeof pointchange>
  | ReturnType<typeof coinchange>
  | ReturnType<typeof healthchange>;
