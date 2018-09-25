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
      locationData: [],
      selectedBtns: {},
      answers: {},
    };
    this.btnSelected = false;
    this.handleClick = this.handleTimeBClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTimeBtns = this.getTimeBtns.bind(this);
    this.getRsrveFm = this.getRsrveFm.bind(this);
  }

  //location form data = bobst, kimmel, yourmom
  //need to display bobst but

  async handleTimeBClick(loc, startTime) {
      const btns = {...this.state.selectedBtns};
      btns[startTime] = !btns[startTime];
      for(let btn in btns) {
        if (btn === startTime)
          continue;
        else {
          btns[btn] = false;
          //console.log(btns[btn]);
        }
      }
      if(btns[startTime] === false) {
        await this.setState({
          locationData: [],
          selectedBtns: btns,
        });
      }

      let locationData = await API.getLocInfo(loc);
      if (this.state.locationData.length === 0 && btns[startTime]){
        //console.log(btns);

        this.setState({
          selectedBtns: btns,
          locationData,
        });
      }
      else {
        this.setState({
          selectedBtns: btns,
          key: '666',
        });
      }
      console.log(btns);
  }

// merge = ( ...objects ) => ( { ...objects } );

  handleChange = event => {
    this.setState({
      answers: {...this.state.answers, [event.target.name]: event.target.value},
    });
  }

  getRsrveFm(locFmArray) {
    let res = locFmArray.map((qs) => {
      return (
        <div className='questionContain'>
          <label htmlFor={qs.name}>{qs.description}</label><br/>
          <input type='text' name={qs.name} length={20} defaultValue={null} required={true} onChange={this.handleChange}/>
        </div>
      )
    });

    return res;
  }

  reserve = async event => {
    event.preventDefault();
    console.log(this.state.answers);
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
          <TimeBtn btnSelected={this.state.selectedBtns[time.openTime]}
            key={time.openTime}
            loc={this.props.bldg}
            startTime={time.openTime}
            onClick={() => {this.handleTimeBClick(this.props.bldg, time.openTime)}}>
          </TimeBtn>
        );
      });
    }
    else if (this.props.startTime) {
      this.btnArr[0] = <TimeBtn btnSelected={this.state.selectedBtns[this.props.startTime]}
              key={this.props.openTime + 'xxx'}
              loc={this.props.bldg}
              startTime={this.props.startTime}
              onClick={() => {this.handleTimeBClick(this.props.bldg, this.props.startTime)}}>
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
                </div>
            </div>
          {this.props.children}
          </div>
          <div className='line2'></div>
          <form onSubmit={this.reserve}>
            {(this.state.locationData.length !== 0) ? (
              <div>
                {this.getRsrveFm(this.state.locationData.supplementaryFields)}
                <button type="submit" value='submit'>Submit</button>
              </div>


            ) : <div></div>}
          </form>
        </div>
    );
  }
}


export default RoomCard;
