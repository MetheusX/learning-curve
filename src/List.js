import React, { Component } from 'react';
import styled from 'styled-components';

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
  render() {
    return (
      <Ul>
        {[...Array(20)].map((_, i) => (
          <Item>
            <h3>{`Item ${i + 1}`}</h3>
            <span>{`price: $${i * 20}`}</span>
          </Item>
        ))}
      </Ul>
    );
  }
}
