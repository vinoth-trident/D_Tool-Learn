import {BOTTOM_TABS, TASK_STACK, TASKID_SCREEN} from '../constants/screens';

export type ProtectedParamsList = {
  [BOTTOM_TABS]: undefined;
  [TASK_STACK]: {
    screen: string;
    params: {id: string};
  };
  [TASKID_SCREEN]: {id: string | number};
};
