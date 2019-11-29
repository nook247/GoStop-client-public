export const SAVETODOS = 'SAVETODOS' as const;

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

export default function savetodos(todosarr : Todosarr) {
  return {
    todosarr,
    type : SAVETODOS,
  };
}

export type TodosAction = ReturnType<typeof savetodos>;
