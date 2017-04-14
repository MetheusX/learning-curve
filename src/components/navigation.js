import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyles = {
  'color' : 'red',
  'fontWeight': 'bold'
};

export default function Navigation(){
  return (
    <nav>
      <ul>
        <li><NavLink exact activeStyle={activeStyles} to="/">Home</NavLink></li>
        <li><NavLink activeStyle={activeStyles} to="/about">About</NavLink></li>
        <li><NavLink activeStyle={activeStyles} to="/shop">Shop</NavLink></li>
      </ul>
    </nav>
  );
};
