import { fork } from 'redux-saga/effects';
import watchShopSaga from './saga/shopSaga';
import watchNotificationSaga from './saga/notificationSaga'

export default function* rootSaga() {
  yield fork(watchShopSaga);
  yield fork(watchNotificationSaga)
}
