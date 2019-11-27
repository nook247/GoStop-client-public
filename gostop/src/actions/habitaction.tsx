export const SAVEHABIT = 'SAVEHABIT' as const;

export interface Habit {
  id : string;
  title : string;
  description : string;
  alarmId : string;
  difficulty : number;
  positive : boolean;

}

export interface Habitarr {
  habitarr : Habit[];

}

export function savehabit( habitarr : Habitarr ) {
  return {
    habitarr,
    type : SAVEHABIT,
  };
}

export type SavehabitAction = ReturnType<typeof savehabit>;
