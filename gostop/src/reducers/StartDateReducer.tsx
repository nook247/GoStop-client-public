import { SAVESTARTDATE, StartDatetype, StartDateAction } from '../actions/startdateaction';

const initialdate : StartDatetype = {
  date : new Date(),
};

const StartDateReducer = (state : StartDatetype = initialdate, action : StartDateAction): StartDatetype => {
  switch (action.type){
    case SAVESTARTDATE:
      return Object.assign({}, state, {
        date : action.date,
      });

    default:
      return state;
  }
};

export default StartDateReducer;