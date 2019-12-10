import { SAVETODOS, Todos, TodosAction, Todosarr } from '../actions/todosaction';

const initialtodos : Todos = {
  id : 'id',
  title : 'title',
  description : 'description',
  // alarmId : 'alamId',
  difficulty : 1,
  dateStart : '2019-11-28',
  dateEnd : '2019-12-01',
  completed : false,
};

const initialState : Todosarr = {
  todosarr : [initialtodos],
};

const todosreducer = (state : Todosarr = initialState, action : TodosAction): Todosarr => {
  switch (action.type){
    case SAVETODOS:
      return Object.assign({}, state, {
        todosarr : action.todosarr,
      });

    default:
      return state;
  }
};

export default todosreducer;
