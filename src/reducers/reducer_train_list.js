import { GET_TRAIN_LIST } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_TRAIN_LIST:
      return action.payload;

    default:
      return state;
  }

}
