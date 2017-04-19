import { takeLatest, call, put } from 'redux-saga/effects'
import {
  REQUEST_LIST_DATA,
  REQUEST_ITEM_DATA,
  recievedListData,
  recievedItemData
} from '../ducks/listDucks'
import { fetchItems, fetchItem } from '../api';

//entire shop list fetch
function* getShopListSaga(){
  try{
    const response = yield call(fetchItems);

    yield put(recievedListData(response.data));

  }catch(e){
    console.log('ERROR SAGA DETECTED!')
  }
}

//single item fetch
function* getShopItemSaga(action){
  try{
    const response = yield call(fetchItem, action.payload);

    yield put(recievedItemData(response.data));

  }catch(e){
    console.log('ERROR SAGA DETECTED!')
  }
}

export default function* watchShopSaga() {
  yield takeLatest(REQUEST_LIST_DATA, getShopListSaga);
  yield takeLatest(REQUEST_ITEM_DATA, getShopItemSaga);
}
