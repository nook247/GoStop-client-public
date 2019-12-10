export const GETUSER = 'GETUSER' as const;
export const POINTCHANGE = 'POINTCHANGE' as const;
export const HEALTHCHANGE = 'HEALTHCHANGE' as const;
export const COINCHANGE = 'COINCHANGE' as const;

export function getuser(id: string, email : string, name : string, userCode : number, level :number, health : number, point : number, coin : number, token : string,) {
    return {
        id,
        email,
        name,
        userCode,
        level,
        health,
        point,
        coin,
        token,
        type : GETUSER,
    };
}

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

export type GetuserAction =
 | ReturnType<typeof getuser>
 | ReturnType<typeof coinchange>
 | ReturnType<typeof healthchange>
 | ReturnType<typeof pointchange>;
