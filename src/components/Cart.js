import React, { Component } from 'react';
import { removeFromCart } from '../ducks/listDucks';
import { connect } from 'react-redux';
import { totalSelectedItemsDataSelector } from '../selectors/shopSelector';

class Cart extends Component {
  render() {
    return (
      <div>
        {!Object.keys(this.props.itemsInCart).length ? "Empty Cart" : null}
        <ul>
          {
            this.props.itemsInCart.map(item => (
              <li key={item.id}>
                <h3>{item.name} {(item.numOfItemsInCart > 1) ? `(${item.numOfItemsInCart})`: null}</h3>
                <span>{`price: $${item.price}`}</span>
                <button onClick={() => this.props.removeItem(item.id)}>Remove</button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

//what keys should be taken from the state for this component
const mapStateToProps = (state) => ({
  itemsInCart : totalSelectedItemsDataSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  removeItem :  itemId => dispatch(removeFromCart(itemId))
})

//association between action creators and state
Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

export default Cart
