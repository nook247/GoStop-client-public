import { SAVEREWARD, Reward, RewardAction, Rewardarr } from '../actions/rewardaction';

const initialreward : Reward = {
  id : 'id',
  title : '제목을 입력하세요',
  description : '설명을 입력하세요',
  // alarmId : 'alamId',
  coin : 30,
};

const initialState : Rewardarr = {
  rewardarr : [initialreward],
};

const rewardreducer = (state : Rewardarr = initialState, action : RewardAction): Rewardarr => {
  switch (action.type){
    case SAVEREWARD:
      return Object.assign({}, state, {
        rewardarr : action.rewardarr,
      });

    default:
      return state;
  }
};

export default rewardreducer;
