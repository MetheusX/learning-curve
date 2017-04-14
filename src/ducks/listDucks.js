import { fetchItems, fetchItem } from '../api';
import { removeObjKey } from '../util'

//action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REQUEST_ITEM_DATA = 'REQUEST_ITEM_DATA';
export const RECIEVED_ITEM_DATA = 'RECIEVED_ITEM_DATA';
export const REQUEST_LIST_DATA = 'REQUEST_LIST_DATA';
export const RECIEVED_LIST_DATA = 'RECIEVED_LIST_DATA';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

//action creators
export const requestListData = () => ({
  type : REQUEST_LIST_DATA
});

export const recievedListData = data => ({
  type : RECIEVED_LIST_DATA,
  payload : data
});

export const requestItemData = () => ({
  type : REQUEST_ITEM_DATA
});

export const recievedItemData = (data) => ({
  type : RECIEVED_ITEM_DATA,
  payload : data
});

export const setVisibilityFilter = filter => ({
  type : SET_VISIBILITY_FILTER,
  payload : filter
});

export const addToCart = id => ({
  type : ADD_TO_CART,
  payload : id
});

export const removeFromCart = (itemId) => ({
  type : REMOVE_FROM_CART,
  payload : itemId
})

//async thunk function
export const fetchListData = () => (dispatch) => {
  dispatch(requestListData()); //send request data action
  fetchItems().then(response => {
    dispatch(recievedListData(response.data));
  })
}

export const fetchItemData = (itemId) => (dispatch) => {
  dispatch(requestItemData()); //send request data action
  fetchItem(itemId).then(response => {
    dispatch(recievedItemData(response.data));
  })
}

//initial state
const initialState = ({
  visibilityFilter : '',
  items : [],
  itemsInCart : {},
  isLoading : true
});

//reducer
export default (state = initialState, action) => {
  switch(action.type){
    case ADD_TO_CART:
      const doesItemExistInCart = state.itemsInCart[action.payload];
      let cartItem = doesItemExistInCart || (state.itemsInCart[action.payload] = {numOfItemsInCart : 0});
      cartItem.numOfItemsInCart++;

      return {
        ...state,
        itemsInCart : {...state.itemsInCart}
      }
    case REMOVE_FROM_CART:
      let nextStateItemsInCart = {...state.itemsInCart};
      const cartItemToRemove = nextStateItemsInCart[action.payload];

      if(cartItemToRemove.numOfItemsInCart > 1){
        cartItemToRemove.numOfItemsInCart--;
      }else{
        nextStateItemsInCart = removeObjKey(nextStateItemsInCart, action.payload)
      }

      return {
        ...state,
        itemsInCart : nextStateItemsInCart
      }
    case REQUEST_LIST_DATA:
    case REQUEST_ITEM_DATA:
      return {
        ...state,
        isLoading : true
      }
    case RECIEVED_ITEM_DATA:
      return {
        ...state,
        items : [...state.items, action.payload],
        isLoading : false
      }
    case RECIEVED_LIST_DATA:
      return {
        ...state,
        items : action.payload,
        isLoading : false
      }
    case SET_VISIBILITY_FILTER :
      return {
        ...state,
        visibilityFilter : action.payload
      }
    default :
      return state;
  }
}
