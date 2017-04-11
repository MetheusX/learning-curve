import React, { Component } from 'react';
import styled from 'styled-components';
import { fetchItems } from './api';

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

export default class List extends Component {
  state = {
    isLoading : true,
    visibilityFilter : '',
    items : []
  }
  componentDidMount = () =>
    fetchItems()
      .then(response =>
        this.setState({
          items : response.data,
          isLoading : false
        })
      )
      .catch((e) => console.log(e));
  onChangeFilterHandler = (e) => {
    this.setState({
      visibilityFilter: e.target.value
    });
  }
  render() {
    let filteredList = this.state.items.filter(item =>
      item.name.indexOf(this.state.visibilityFilter) !== -1
    )

    return (
      <div>
        {
          (this.state.isLoading) ? <span>Loading</span> : ''
        }
        <input type="text" value={this.state.visibilityFilter} onChange={this.onChangeFilterHandler}/>
        <Ul>
          {filteredList.map(item => (
            <Item key={item.id}>
              <h3>{item.name}</h3>
              <span>{`price: $${item.price}`}</span>
            </Item>
          ))}
          {(filteredList.length === 0) ? <li>No matches</li>: ''}
        </Ul>
      </div>
    );
  }
}
