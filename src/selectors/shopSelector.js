import { createSelector } from 'reselect'

const idFromURLSelector = (_, props) => props.match.params.itemId;
export const loadingSelector = state => state.shop.isLoading;
export const selectedItemsSelector = state => state.shop.itemsInCart;
export const itemSelector = state => state.shop.items;
export const visibilityFilterSelector = state => state.shop.visibilityFilter;

export const getItemByURLParamSelector = createSelector(
  [itemSelector, idFromURLSelector],
  (items, id) => items.find(item  => item.id === id),
);

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
    Object.keys(itemsInCart).reduce((acc, id) => (
      acc + itemsInCart[id].numOfItemsInCart * getItemById(items, id).price
    ), 0)
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
  (items, filter) => (
    items.filter(item =>
      item.name.indexOf(filter) !== -1
    )
  )
)
