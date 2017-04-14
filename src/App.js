import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ShopContainer from './containers/shopContainer';
import Navigation from './components/navigation';
import { Route } from 'react-router-dom'

const Wrapper = styled.div`
  max-width: 960px;
  padding: 10px 15px;
  margin: 0 auto;
`;

const theme = {
  primary : '#6E7F80',
  secondary : '#FA6E79'
};

const Home = () =>{
  return (
    <div>
      <h1>You are Home</h1>
    </div>
  )
};

const About = () => {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/shop" component={ShopContainer} />
      </Wrapper>
    </ThemeProvider>
  );
}
