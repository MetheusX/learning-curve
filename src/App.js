import React from 'react';
import styled from 'styled-components';
import List from './List';

const Wrapper = styled.div`
  max-width: 960px;
  padding: 10px 15px;
  margin: 0 auto;
`;

export default function App() {
  return (
    <Wrapper>
      <List />
    </Wrapper>
  );
}
