import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SVG_URL = 'https://image.flaticon.com/icons/svg/2/2772.svg';
const SVGWrapper = styled.div`
  position: relative;
  &::before {
    content : '${props => props.numOfItems}';
    position: absolute;
    border-radius: 50%;
    background-color: red;
    width: 18px;
    height: 18px;
    text-align: center;
    color: white;
    font-size: 14px;
  }
`;

const StyledSVG = styled.svg`
  background-image: url(${SVG_URL});
  width : 40px;
  height : 40px;
`;

class CartSummary extends Component {
  render() {
    return (
      <div>
        <SVGWrapper numOfItems={this.props.totalNumOfItems}>
          <StyledSVG/>
          <Link to="/shop/cart">Cart</Link>
          <span>{`$${this.props.totalPrice}`}</span>
        </SVGWrapper>
      </div>
    );
  }
}

const getItemById = (items, id) => {
  return items.find(item => item.id === id);
}

//what keys should be taken from the state for this component
const mapStateToProps = (state) => ({
  totalPrice : Object.keys(state.cardList.itemsInCart).reduce((acc, id) => {
    const itemsInCart = state.cardList.itemsInCart;
    const items = state.cardList.items;

    return acc = acc + itemsInCart[id].numOfItemsInCart * getItemById(items, id).price
  }, 0),
  totalNumOfItems : Object.keys(state.cardList.itemsInCart).length,
});

//association between action creators and state
CartSummary = connect(
  mapStateToProps,
  {}
)(CartSummary)

export default CartSummary
