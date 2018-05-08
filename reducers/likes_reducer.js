import { LIKE_JOB } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action){
  switch(action.type){
    default:
      return state;
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state], 'jobkey');
  }
}
