import React from 'react';

import Banner from '../components/Banner/Banner.js';
import RoomRec from '../components/mainMenu/RoomRec.js';
import pic from '../components/mainMenu/pic.jpeg';
//import Transparent from './Transparent.js';
import LandingPg from './LandingPg.js';



const pict = [pic, pic, pic];

const HomePg = (props) => {
  return(
    <div>
      <div>
        {props.loggedIn && <Banner/>}
        {!props.loggedIn && <LandingPg loginClicked={props.login}/>}
      </div>
      {props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pict}/>}
    </div>
  )
}


export default HomePg;
