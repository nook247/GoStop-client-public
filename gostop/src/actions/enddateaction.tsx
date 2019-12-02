export const SAVEENDDATE = 'SAVEENDDATE' as const;

export interface EndDatetype {
    date : Date;
}


export default function saveEndDate(date : EndDatetype) {
  return {
    date,
    type : SAVEENDDATE,
  };
}

export type EndDateAction = ReturnType<typeof saveEndDate>;