import { Todos, Todosarr, SAVETODOS, TodosAction } from '../actions/todosaction';

const initialtodos : Todos = {
  id : 'id',
  title : 'title',
  description : 'description',
  alarmId : 'alamId',
  difficulty : 1,
  dateStart : 'dateStart',
  dateEnd : 'dateEnd',
  completed : true,
};

const initialState : Todosarr = {
  todosarr : [initialtodos],
};

const todosreducer = (state : Todosarr = initialState, action : TodosAction): Todosarr =>{
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

// import { TODOCOMPLETE, TodosAction } from '../actions/todosaction';
// import fakeserver from '../fakeserver';

// export interface TodosState {
//   id : number;
//   completed : boolean;

// }

// const initialState : TodosState = {
//   id : 0,
//   completed : true
// };

// const TodosReducer = (state : TodosState = initialState, action : TodosAction): TodosState => {
//   switch (action.type){
//     case TODOCOMPLETE:
//       const todoData = {
//         id: action.id,
//         completed: !action.completed,
//       };
//       fetch(`${fakeserver}/todos/${action.id}`, {
//         method : 'PUT',
//         body : JSON.stringify(todoData),
//         headers : {
//           'Content-Type' : 'application/json',
//         },
//       }).then((res) => {
//         if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
//           res.json()
//                 .then(() => console.log('checkbox put 성공'));
//         }
//       });
//       return Object.assign({}, state, {
//         id : action.id,
//         completed : !action.completed,
//       });
//     default:
//       return state;
//   }
// };

// export default TodosReducer;
