import { SAVEDATE, Datetype, DateAction } from '../actions/dateaction';

const initialdate : Datetype = {
  date : new Date(),
};

const datereducer = (state : Datetype = initialdate, action : DateAction): Datetype => {
  switch (action.type){
    case SAVEDATE:
      return Object.assign({}, state, {
        date : action.date,
      });

    default:
      return state;
  }
};

export default datereducer;