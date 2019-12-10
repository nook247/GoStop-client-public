import { SAVEENDDATE, EndDatetype, EndDateAction } from '../actions/enddateaction';

const initialdate : EndDatetype = {
  date : new Date(),
};

const EndDateReducer = (state : EndDatetype = initialdate, action : EndDateAction): EndDatetype => {
  switch (action.type){
    case SAVEENDDATE:
      return Object.assign({}, state, {
        date : action.date,
      });

    default:
      return state;
  }
};

export default EndDateReducer;