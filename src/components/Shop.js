import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {
  setVisibilityFilter,
  requestListData,
  addToCart
} from '../ducks/listDucks';
import { connect } from 'react-redux'
import {
  loadingSelector,
  selectedItemsSelector,
  filteredListSelector
} from '../selectors/shopSelector';
import { errorLevels } from './Errors'
import { showNotification } from '../ducks/notificationsDucks';



const StyledButton = styled.button`
  background-color: ${
    props => props.isActive ? props.theme.secondary : props.theme.primary
  }
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
        <button onClick={
          () => this.props.showNotification("Critical Msg", errorLevels.CRITICAL)}>Simulate Critical Error
        </button>
        <button onClick={
          () => this.props.showNotification("Warning Msg",errorLevels.WARNING)}>Simulate Warning Error
        </button>
        <button onClick={
          () => this.props.showNotification("Info Msg", errorLevels.INFO)}>Simulate Info Error
        </button>
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
const mapStateToProps = state => ({
  items : filteredListSelector(state),
  itemsInCart : selectedItemsSelector(state),
  isLoading : loadingSelector(state)
});

//action creators mapped to props
const mapDispatchToProps = dispatch => ({
  setVisibilityFilter :  filter => dispatch(setVisibilityFilter(filter)),
  fetchListData : () => dispatch(requestListData()),
  addToCart : id => dispatch(addToCart(id)),
  showNotification : (msg, level) => dispatch(showNotification({
    msg : msg,
    level : errorLevels[level],
    isViewable : true,
    id : Date.now()
  }))
});

//association between action creators and state
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
