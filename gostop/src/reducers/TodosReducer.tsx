import { TODOCOMPLETE, TODOINCOMPLETE, TodosAction } from '../actions/todosaction';
import fakeserver from '../fakeserver';
// import { HabitsState, Habit } from './reducer'

export interface TodosState {
  id : number;
  completed : boolean;

}

const initialState : TodosState = {
  id : 0,
  completed : true,
};

const TodosReducer = (state : TodosState = initialState, action : TodosAction): TodosState => {
  switch (action.type){
    case TODOCOMPLETE:
      const todoData = {
        id: action.id,
        completed: !action.completed,
      };
      fetch(`${fakeserver}/todos/${action.id}`, {
        method : 'PUT',
        body : JSON.stringify(todoData),
        headers : {
          'Content-Type' : 'application/json',
        },
      }).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
          res.json()
                .then(() => console.log('checkbox put 성공'));
        }
      });
      return Object.assign({}, state, {
        id : action.id,
        completed : !action.completed,
      });
    default:
      return state;
  }
};

export default TodosReducer;
