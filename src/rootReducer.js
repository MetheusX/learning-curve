import { combineReducers } from 'redux';
import shopReducer from './ducks/listDucks';
import notificationsReducer from './ducks/notificationsDucks';

export default combineReducers({
  shop : shopReducer,
  notifications : notificationsReducer
});
