import React from 'react';
import { DropdownButton, MenuItem, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
//import Banner from '../components/Banner/Banner.js';
//import RoomRec from '../components/mainMenu/RoomRec.js';
//import pic from '../components/mainMenu/pic.jpeg';
//import Transparent from './Transparent.js';
import '../index.css';
import Filter from '../components/booking/Filter';
import LandingPg from './LandingPg.js';


//const pict = [pic, pic, pic];

const HomePg = (props) => {
  return (
    <div className="home">
        <Filter homePg={true}/>
        {!props.loggedIn && <LandingPg loginClicked={props.login}/>}
        <DropdownButton
          title={'dropdown'}
          key={'hey'}
          id={'hey2'}
          >
            Dropdown button
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>
              Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
        </DropdownButton>
    </div>
  );
};


export default HomePg;


/*
{props.loggedIn && <Banner/>}
{props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pict}/>} */
