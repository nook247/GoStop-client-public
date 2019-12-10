export const PASSHABIT = 'PASSHABIT' as const;

export function passhabit(id : string, title : string, description : string, alarmId : string, difficulty : number, positive : boolean) {
  return {
    id,
    title,
    description,
    alarmId,
    difficulty,
    positive,
    type : PASSHABIT,
  };
}

export type PasshabitAction = ReturnType<typeof passhabit>;
