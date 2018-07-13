import React from 'react';
import { NavLink } from 'react-router-dom';


import '../index.css';



const Btn = (props) => {
  return (
    <div>
      <NavLink to="/home/" className="navLink">
        <button className="helloBtn">
          hello
        </button>
      </NavLink>
    </div>
  )
};

export default Btn;
