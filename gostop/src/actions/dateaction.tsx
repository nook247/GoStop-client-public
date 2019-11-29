export const SAVEDATE = 'SAVEDATE' as const;

export interface Datetype {
    date : Date;
}


export default function savedate(date : Datetype) {
  return {
    date,
    type : SAVEDATE,
  };
}

export type DateAction = ReturnType<typeof savedate>;
