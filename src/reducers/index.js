import { combineReducers } from 'redux';
import TrainListReducer from './reducer_train_list';

const rootReducer = combineReducers({
  trainList: TrainListReducer
});

export default rootReducer;
