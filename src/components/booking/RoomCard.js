import React from 'react';
import dateFormat from 'dateformat';

import Card from './Card.js';
import API from '../../utils';
import TimeBtn from './TimeBtn';
import './roomCard.css';
import '../../god.css';

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
    this.btnArr = [];
    this.state = {
      duration: 2,
      location: this.props.bldg,
      occupants: 1,
      date: d.toString(),
      startTime: '',
      selected: false,
      key: 'urMom',
    };
    this.btnSelected = false;
  }

  handleClick(loc) {
      this.btnSelected= !this.btnSelected;
      this.setState({
        key: 'mmm'
      });
    //API.getLocInfo(loc)
  }



  jsUcfirst() {
    if(this.props.bldg) {
      return this.props.bldg.charAt(0).toUpperCase() + this.props.bldg.slice(1).toLowerCase();
    }
    else return " ";

  }

  getTimeBtns() {
    if(this.props.startTimes){
      this.btnArr = this.props.startTimes.map((time)=> {
        //console.log(time.openTime);
        return (
          <TimeBtn btnSelected={this.btnSelected}
            key={time.startTime}
            loc={this.props.bldg}
            startTime={time.openTime}
            onClick={() => {this.handleClick(this.props.bldg)}}>
          </TimeBtn>
        );
      });
    }
    else if (this.props.startTime) {
      this.btnArr[0] = <TimeBtn btnSelected={this.btnSelected}
              key={this.props.startTime}
              loc={this.props.bldg}
              startTime={this.props.startTime}
              onClick={() => {this.handleClick(this.props.bldg)}}>
          </TimeBtn>
    }

    return this.btnArr;
  }

  render() {
    //console.log(this.props.startTimes);
    this.getTimeBtns();
    return (
      <div className='rrBorder borderHack' key={this.state.key}>
        <div className="roomRec2"  img={this.props.img}>
            <div className="topCard">
              <div className="recImgDv">
                {this.props.img && <img src={this.props.img} className="recImg" alt="a room"/>}
              </div>
              <div className="roomInfo">
                <div className="roomTitle purple">
                  {this.jsUcfirst() + ' ' + this.props.roomNumber}
                </div>
                <span className="attribute">Location</span> : {this.jsUcfirst()}
                <br/>
                <span className="attribute">Capacity</span> : {this.props.capacity} person(s)
                <br/>
                <span className="attribute">Date</span> : {this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, "shortDate") : dateFormat(this.props.startTime, "shortDate")}
                <br/>
                <span className="attribute">Duration</span> : {this.props.duration ? this.props.duration : ' '} hour(s)
              </div>
            </div>
            <div className="time">
              select your time
              <div className="tBtnContain">
                {this.btnArr}
                {/* <TimeBtn btnSelected={this.state.btnSelected} loc={this.props.bldg} startTime={this.props.startTimes ? this.props.startTimes[0].openTime : this.props.startTime} onClick={() => {this.handleClick(this.props.bldg)}}></TimeBtn> */}
              </div>
            </div>
          {this.props.children}
          </div>
          <div className='line2'></div>
        </div>
    );
  }
}


export default RoomCard;
