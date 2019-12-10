export const SAVESTARTDATE = 'SAVESTARTDATE' as const;

export interface StartDatetype {
    date : Date;
}


export default function saveStartDate(date : StartDatetype) {
  return {
    date,
    type : SAVESTARTDATE,
  };
}

export type StartDateAction = ReturnType<typeof saveStartDate>;