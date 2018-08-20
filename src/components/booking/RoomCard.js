import React from 'react';
import dateFormat from 'dateformat';

import Card from './Card.js';
import API from '../../utils';
import TimeBtn from './TimeBtn';
import './roomCard.css';

dateFormat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};

class RoomCard extends Card {

  constructor(props) {

    const d = new Date();

    super(props);

    this.amenity = false;
    this.isRoomRec = true;
    // this.title.className = 'recTitle';
    this.className = this.className + ' roomRec2';
    this.timeBtn = React.createRef();
    this.state = {
      duration: 2,
      location: this.props.bldg,
      occupants: 1,
      date: d.toString(),
      startTime: '',
      btnSelected: false,
      selected: false,
    };

  }

  handleClick(loc) {
    this.setState({
      btnSelected: !this.state.btnSelected,
    });
    API.getLocInfo(loc)
  }



  jsUcfirst() {
    if(this.props.bldg) {
      return this.props.bldg.charAt(0).toUpperCase() + this.props.bldg.slice(1).toLowerCase();
    }
    else return " ";

  }

  render() {



    return (
      <Card className="roomRec2"  img={this.props.img} >
        <div className="topCard">
          <div className="recImgDv">
            {this.props.img && <img src={this.props.img} className="recImg"/>}
          </div>
          <div className="roomInfo">
            <div className="roomTitle">
              {this.jsUcfirst() + ' ' + this.props.roomNumber}
            </div>
            Location : {this.jsUcfirst()}
            <br/>
            Capacity : {this.props.capacity} person(s)
            <br/>
            Date : {dateFormat(this.props.startTime, "shortDate")}
          </div>
        </div>
        <div className="time">
          select your time
          <div>
            <TimeBtn btnSelected={this.state.btnSelected} loc={this.props.bldg} startTime={this.props.startTime} onClick={() => {this.handleClick(this.props.bldg)}}></TimeBtn>
          </div>
        </div>
        {this.props.children}
      </Card>
      // <div className={'base ' + (this.lastItem && ' lastItem ' ) + ' ' + (this.isRoomRec && ' roomRec' )+ ' ' + (this.srchBtn && ' advancedSearchCard' )} onClick={this.props.onClick}>
      //   <div>
      //     {this.props.img && <img src={this.props.img} className="recImg"/>}
      //   </div>
      //   <div className={(this.props.title && ' title ') + ' ' + (this.bigTitle && ' bigTitle' )}>
      //       {this.props.title && this.title}
      //     {this.bigTitle && this.props.clear &&
      //       <span className="clear">
      //       <button onClick={this.props.clrFilter}>
      //         Clear
      //       </button>
      //     </span>}
      //   </div>
      //
      //
      //   <div style={{ marginLeft: '0px'}} className='child '>
      //     {this.props.children}
      //   </div>
      // </div>
    );
  }
}


export default RoomCard;
