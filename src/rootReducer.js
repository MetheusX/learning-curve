import { combineReducers } from 'redux';
import itemsReducer from './ducks/listDucks';

export default combineReducers({
  cardList : itemsReducer
});
