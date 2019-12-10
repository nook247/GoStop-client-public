export const SAVEREWARD = 'SAVEREWARD' as const;

export interface Reward {
  id : string;
  title : string;
  description : string;
  coin : number;
}

export interface Rewardarr {
  rewardarr : Reward[];
}

export default function savereward(rewardarr : Rewardarr) {
  return {
    rewardarr,
    type : SAVEREWARD,
  };
}

export type RewardAction = ReturnType<typeof savereward>;
