import { takeLatest, call, put } from 'redux-saga/effects'
import {
  REQUEST_NOTIFICATIONS,
  recievedNotifications
} from '../ducks/notificationsDucks';
import { fetchNotifications } from '../api';

function* getNotoficationsSaga(){
  try{
    const response = yield call(fetchNotifications);

    yield put(recievedNotifications(response.data));
  }catch(e){
    console.log('ERROR NOTIFICATION SAGA DETECTED!')
  }
}

export default function* watchNotificationSaga() {
  yield takeLatest(REQUEST_NOTIFICATIONS, getNotoficationsSaga);
}
