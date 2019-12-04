import { SAVETODOS, Todos, TodosAction, Todosarr } from '../actions/todosaction';

const initialtodos : Todos = {
  id : '',
  title : '제목을 입력하세요',
  description : '설명을 입력하세요',
  // alarmId : 'alamId',
  difficulty : 1,
  dateStart : '2000-01-01',
  dateEnd : '2999-12-31',
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
