import React from 'react';
import { BrowserRouter as  BrowserRouter, NavLink} from 'react-router-dom';

import './index.css';




class Btn extends React.Component {
  constructor(props) {

    super(props);
  }


  render () {
    return (
      <div className="homeContainer">
        <NavLink to='/home/'>
          <button className="helloBtn">Hello</button>
        </NavLink>
      </div>
    );
  }


}





export default Btn;
