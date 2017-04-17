import { createSelector } from 'reselect'

export const loadingSelector = state => state.cardList.isLoading;
export const selectedItemsSelector = state => state.cardList.itemsInCart;
export const itemSelector = state => state.cardList.items;
export const visibilityFilterSelector = state => state.cardList.visibilityFilter;

export const getItemByURLParamSelector = (state, props) => {
  return state.cardList.items.find((item) => {
    return props.match.params.itemId === item.id
  })
};

export const numOfItemsInCarSelector = createSelector(
  selectedItemsSelector,
  itemsInCart => Object.keys(itemsInCart).length
);

const getItemById = (items, id) => {
  return items.find(item => item.id === id);
};

export const totalPriceOfCartSelector = createSelector(
  selectedItemsSelector,
  itemSelector,
  (itemsInCart, items) => (
    Object.keys(itemsInCart).reduce((acc, id) => {
      return acc = acc + itemsInCart[id].numOfItemsInCart * getItemById(items, id).price
    }, 0)
  )
);

export const totalSelectedItemsDataSelector = createSelector(
  selectedItemsSelector,
  itemSelector,
  (itemsInCart, items) =>
    Object.keys(itemsInCart).map(itemId => ({
      ...getItemById(items, itemId),
      ...itemsInCart[itemId] //adds in the numOfItemsInCart
    }))

);

export const filteredListSelector = createSelector(
  itemSelector,
  visibilityFilterSelector,
  (items, filter) => {
    return items.filter(item =>
      item.name.indexOf(filter) !== -1
    )
  }
)
