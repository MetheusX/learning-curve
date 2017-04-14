import { combineReducers } from 'redux';
import itemsReducer from './Ducks/listDucks';

export default combineReducers({
  cardList : itemsReducer
});
