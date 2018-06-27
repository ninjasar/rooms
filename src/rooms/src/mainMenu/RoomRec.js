import React from 'react';


import './roomRec.css';
import OptionsCard from './OptionsCard.js';



const RoomRec = (props) => {
  return (
    <div className="stuffBehind {(this.props.loggedIn ? '' : 'blurred')}">
      <OptionsCard pic={props.pics[0]} txt='Individual'  url="/individualReservation" description='Instantly reserve the closest room'/>
      <OptionsCard pic={props.pics[1]} txt='Group'  url="/groupReservation" description='Instantly reserve the closest room for a group of people'/>
      <OptionsCard pic={props.pics[2]} txt='Search' url="/advancedSearch"  description='Advanced Search'/>
    </div>
  )
};

export default RoomRec;
