import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { setVisibilityFilter, fetchListData, addToCart} from '../ducks/listDucks';
import { connect } from 'react-redux'

const StyledButton = styled.button`
  background-color: ${props => props.isActive ? props.theme.secondary : props.theme.primary}
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.li`
  display: block;
  margin: 5px;
  padding: 10px 15px;
  flex-basis: calc(20% - 10px);
  border-radius: 2px;
  background-color: #eee;
`;

class List extends Component {
  componentDidMount() {
    if(this.props.items.length === 0){
      this.props.fetchListData();
    }
  }
  onChangeFilterHandler = (e) => {
    this.props.setVisibilityFilter(e.target.value);
  }
  render() {
    return (
      <div>
        {
          this.props.isLoading && <span>Loading</span>
        }
        <input type="text" onChange={this.onChangeFilterHandler}/>
        <Ul>
          {this.props.items.map(item => (
            <Item key={item.id}>
              <h3>{item.name} {this.props.itemsInCart[item.id] ? `(${this.props.itemsInCart[item.id].numOfItemsInCart})` : null}</h3>
              <span>{`price: $${item.price}`}</span>
              <StyledButton
                isActive={this.props.itemsInCart[item.id] ? true : false}
                onClick={() => this.props.addToCart(item.id)}>Add to Cart</StyledButton>
                <Link to={`/shop/${item.id}`}>View</Link>
            </Item>
          ))}
          {(this.props.items.length === 0 && !this.props.isLoading) ? <li>No matches</li>: ''}
        </Ul>
      </div>
    );
  }
}

//what keys should be taken from the state for this component
const mapStateToProps = (state) => ({
  items : state.cardList.items.filter(item =>
    item.name.indexOf(state.cardList.visibilityFilter) !== -1
  ),
  itemsInCart : state.cardList.itemsInCart,
  isLoading : state.cardList.isLoading
});

//action creators mapped to props
const mapDispatchToProps = (dispatch) => ({
  setVisibilityFilter :  (filter) => dispatch(setVisibilityFilter(filter)),
  fetchListData : () => dispatch(fetchListData()),
  addToCart : (id) => dispatch(addToCart(id))
});

//association between action creators and state
const Shop = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default Shop
