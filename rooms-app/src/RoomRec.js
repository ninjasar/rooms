import React from 'react';

import './roomRec.css';
import OptionsCard from './OptionsCard.js';

class RoomRec extends React.Component {


  render () {

    return (
      <div ref="stuffBehind" className = {`stuffBehind ${this.props.loggedIn ? '' : 'blurred'}`} >
        <OptionsCard pic={this.props.pics[0]} txt="Individual" description="Instantly reserve the closest room"/>
        <OptionsCard pic={this.props.pics[1]} txt="Group" description="Instantly reserve the closest room for a group of people"/>
        <OptionsCard pic={this.props.pics[2]} txt="Search" description="Advanced Search"/>
      </div>
    );

  }


}
export default RoomRec;
