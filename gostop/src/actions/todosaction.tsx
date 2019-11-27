export const TODOCOMPLETE = 'TODOCOMPLETE' as const;
export const TODOINCOMPLETE = 'TODOINCOMPLETE' as const;
export const SAVETODOS = 'SAVETODOS' as const;

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

export interface Todos {
  id : string;
  title : string;
  description : string;
  alarmId : string;
  difficulty : number;
  dateStart : string;
  dateEnd : string;
  completed : boolean;

}

export interface Todosarr {
  todosarr : Todos[];
}

export function savetodos(todosarr : Todosarr) {
  return {
    todosarr,
    type : SAVETODOS,
  };
}

export type TodosAction =
| ReturnType<typeof todocomplete>
| ReturnType<typeof todoincomplete>
| ReturnType<typeof savetodos>;
