import React from 'react';
import { BrowserRouter as  Route, BrowserRouter, NavLink} from 'react-router-dom';

import './index.css';
import AppName from './AppName';
import Banner from './Banner.js';
import RoomRec from './RoomRec.js';
import Transparent from './Transparent.js';
import pic from './pic.jpeg';
import Login from './Login.js';


const pics = [pic, pic, pic]

const Rooms = (props) => (

  <div id="homeLayout" >
    <div className="topBar" >
        <NavLink to="/button/" className="navLink">
          <AppName uName={props.uName}/>
        </NavLink>
    </div>
    <div>
      {props.loggedIn && <Banner/>}
      {console.log(props.loggedIn)}
      {!props.loggedIn && <Login loginClicked={props.login}/>}
    </div>
    {props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pics}/>}
     {/*!props.loggedIn && <Transparent loginClicked={props.login}/>*/}

  </div>
);


export default Rooms;
