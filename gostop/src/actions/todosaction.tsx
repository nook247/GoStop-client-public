export const TODOCOMPLETE = 'TODOCOMPLETE' as const;
export const TODOINCOMPLETE = 'TODOINCOMPLETE' as const;

export function todocomplete(id : number, completed : boolean) {
  return{
    type : TODOCOMPLETE,
    id : id,
    completed : completed,
  }
}

export function todoincomplete(completed : boolean) {
  return{
    type : TODOINCOMPLETE,
    completed : completed,

  }
}

export type TodosAction =
| ReturnType<typeof todocomplete>
| ReturnType<typeof todoincomplete>;
