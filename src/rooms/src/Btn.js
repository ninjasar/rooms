import React from 'react';
import {BrowserRouter, NavLink } from 'react-router-dom';


import './index.css';



const Btn = (props) => {
  return (
    <div className="homeLayout">
      <NavLink to="/home/">
        <button className="helloBtn">
          hello
        </button>
      </NavLink>
    </div>
  )
};

export default Btn;
