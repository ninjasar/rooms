import React from 'react';
import dateFormat from 'dateformat';
import { Redirect, BrowserRouter } from "react-router-dom";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Media from 'react-media';

import Card from './Card.js';
import API from '../../utils';
import TimeBtn from './TimeBtn';
import '../../god.css';
import './roomCard.css';
import Marker from './icons/location.svg';
import People from './icons/people.svg';
import Clock from './icons/clock.svg';
import Coffee from './icons/coffee.svg';
import Printer from './icons/printer.svg';
import Projector from './icons/projector.svg';
import CurrentReservePg from '../../containers/CurrentReservePg';
import Map from './map.png';



/*  -----PROPS for using room card-------
              bldg
              img
              roomNumber
              id
              capacity
              openTime & closeTime/startTimes (depending on the type of room)
              duration
              isRoomRec
*/
const mapsUrl= 'https://maps.google.com/?q=';

class RoomCard extends Card {

  constructor(props) {

    const d = new Date();

    super(props);


    this.amenity = false;
    this.className = this.className + ' roomRec2';
    this.timeBtn = React.createRef();
    this.btnArr = [];
    this.rd;
    this.history = this.props.history;
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
      questions: [],
      answers: {}
    };
    this.handleClick = this.handleTimeBClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reserve = this.reserve.bind(this);
    this.redirect = this.redirect.bind(this);
    this.inputs=[];
    this.reservationSuccessful='';
    this.getTimeBtns = this.getTimeBtns.bind(this);
    this.getRsrveFm = this.getRsrveFm.bind(this);
  }

  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

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
        console.log(btns);

        this.setState({
          selectedBtns: btns,
          locationData,
          questions: locationData.supplementaryFields,
        });
      }
      else {
        this.setState({
          selectedBtns: btns,
          key: '666',
        });
      }
  }

// merge = ( ...objects ) => ( { ...objects } );

  handleChange = event => {
    this.setState({
      answers: {...this.state.answers, [event.target.name]: event.target.value},
    });

  }

  getRsrveFm(locFmArray) {
    console.log(this.state.locationData);
    let res = locFmArray.map((qs, index) => {
      return (
        <div className={`questionContain`} key={qs.name}>
          <label htmlFor={qs.name}>{qs.description}</label><br/>
          <input type='text' className={`qInput responseField_${index}`} name={index} length={20} defaultValue={''} required={true} onChange={this.handleChange}/>
        </div>
      )
    });
    this.inputs = res;

    return res;
  }

  reserve = async event => {
    event.preventDefault();
    const usersInfo = {...API.usersInfo};
    for(var a=0; a<this.state.questions.length; a++){
      if(this.state.answers[a] && this.state.questions[a].length !== 0)
        this.state.questions[a].response = this.state.answers[a];
      else this.state.questions[a].response = null;
    }
    console.log(this.inputs);
    console.log(this.state.questions[0]);
    let result;
    if(this.props.startTime){
      result = await API.makeReservation(usersInfo, this.props.bldg,
        this.props.roomNumber, this.props.id, this.props.bldg, this.props.startTime, this.props.startTime, this.props.duration, this.props.capacity, this.state.questions);
    }
    else if(this.props.startTimes){
      let btns = this.state.selectedBtns;
      let time = '';
      for(var btn in btns) {
        if (btns[btn] === true) {
          time=btn;
        }
      }
      result = await API.makeReservation(usersInfo, this.props.bldg,
        this.props.roomNumber, this.props.id, this.props.bldg, time, time, this.props.duration, this.props.capacity, this.state.questions);
    }
    console.log(result.username);
    if(result.username !== null) {
      this.reservationSuccessful=<div className="success "><br/>Success! Reservation was made.</div>;
      setTimeout(this.redirect, 1000);
    }
    else this.reservationSuccessful=<div className="fail"><br/>Oops! Something went wrong. Try again later.</div>;
    this.setState({
      key: 'm'
    });
  }


  redirect() {

    this.context.router.history.push('/currentReservation');
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
              key={this.props.openTime + 'xx'}
              loc={this.props.bldg}
              startTime={this.props.startTime}
              onClick={() => {this.handleTimeBClick(this.props.bldg, this.props.startTime)}}>
          </TimeBtn>
    }
    return this.btnArr;
  }

  render() {
    this.getTimeBtns();
    if(this.props.isRoomRec) {
      return (
        <Media query="(max-width: 1200px)">
        {matches =>
          matches ? (

          <div className='rrBorder borderHack' key={this.state.key}>
            <div className="medRoomRec2"  img={this.props.img}>
                <div className="medTopSide1">
                  <div className="medRecImgDv1">
                    {this.props.img && <img src={this.props.img} className="medRecImg" alt="a room"/>}
                  </div>
                  <div className="roomInfo">
                    <div className="medRoomTitle purple">
                      {this.jsUcfirst() + ' ' + this.props.roomNumber}
                    </div>
                    <div className='medAttDv'>
                      <div className='attribute'>
                        <span className="medAtt"><img src={Marker}/></span> &nbsp;&nbsp; {this.jsUcfirst()}
                      </div>
                      <div className='attribute'>
                        <span className="medAtt"><img src={People}/></span>  {this.props.capacity} person(s)
                      </div>
                    </div>
                    <div className='medAttDv'>
                    <div className='attribute'>
                      <span className="medAtt"><img src={Clock}/></span> &nbsp;&nbsp; {this.props.duration ? this.props.duration : ' '} hour(s)
                    </div>

                      <div className='medAmenityDv'>
                        <span className="medAttA">{this.props.amenities}<img src={Coffee} alt='coffee' title="Coffee"/> </span>
                        <span className="medAttA">{this.props.amenities}<img className='icon' alt='Printer' src={Printer} title="Printer"/> </span>
                        <span className="medAttA">{this.props.amenities}<img src={Projector} alt='Projector' title="Projector"/> </span>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="time medTime">
                  select your time
                  <div className="tBtnContain">
                    {this.btnArr}
                    </div>
                </div>
              {this.props.children}
              </div>
              {/*<div className='line2'></div>*/}
              <form onSubmit={this.reserve}>
                {(this.state.locationData.length !== 0) ? (
                  <div>
                    {this.getRsrveFm(this.state.locationData.supplementaryFields)}
                    <button type="submit" className='qSubmit pink' value='submit'>Submit</button>
                    {this.rd}
                  </div>

                ) : <div></div>}
              </form>
              {this.reservationSuccessful}
            </div>
        ): (
          <div className='rrBorder borderHack' key={this.state.key}>
            <div className="roomRec"  img={this.props.img}>
                <div className="topCard">
                  <div className="recImgDv">
                    {this.props.img && <img src={this.props.img} className="recImg" alt="a room"/>}
                  </div>
                  <div className="roomInfo">
                    <div className="roomTitle purple">
                      {this.jsUcfirst() + ' ' + this.props.roomNumber}
                    </div>
                    <div className='attDv'>
                      <div className='attribute'>
                        <span className="att"><img src={Marker}/></span> &nbsp;&nbsp;{this.jsUcfirst()}
                      </div>

                      <div className='attribute'>
                        <span className="att"><img src={Clock}/></span>  &nbsp;&nbsp;{this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, "shortDate") : dateFormat(this.props.startTime, "shortDate")}

                          &nbsp; for &nbsp; {this.props.duration ? this.props.duration : ' '} hour(s)
                      </div>
                    </div>
                    <br/>
                    <div className='attDv'>
                      <div className='attribute'>
                        <span className="att"><img src={People}/></span> {this.props.capacity} person(s)
                      </div>

                      <div className='amenityDv'>
                        <span className="attA">{this.props.amenities}<img src={Coffee} alt='coffee' title="Coffee"/> </span>
                        <span className="attA">{this.props.amenities}<img className='icon' alt='Printer' src={Printer} title="Printer"/> </span>
                        <span className="attA">{this.props.amenities}<img src={Projector} alt='Projector' title="Projector"/> </span>
                      </div>
                    </div>

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
              {/*<div className='line2'></div>*/}
              <form onSubmit={this.reserve}>
                {(this.state.locationData.length !== 0) ? (
                  <div>
                    {this.getRsrveFm(this.state.locationData.supplementaryFields)}
                    <button type="submit" className='qSubmit pink' value='submit'>Submit</button>
                    {this.rd}
                  </div>

                ) : <div></div>}
              </form>
              {this.reservationSuccessful}
            </div>
          )
        }
        </Media>
      );
    }
    else return (
      <Media query="(max-width: 1200px)">
          {matches =>
            matches ? (
              <div className='medrrBorder ' key={this.state.key}>
                <div className="medRoomRec2"  img={this.props.img}>

                    <div className="medCurrLeft">
                      <div className='medCurrDate'>
                      <div className='currMD'>{this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, 'MM-DD') : dateFormat(this.props.startTime, "mm/dd")}</div>
                      {this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, 'yyyy') : dateFormat(this.props.startTime, "yyyy")}
                      </div>
                      <div className='medMap'>
                        <a href={mapsUrl+this.props.address} className="medMapLink" target='_blank'>
                        <button className='medMapTxt purple'>go to map</button>
                        <img src={Map} className='medMapImg'/></a>
                      </div>
                      <div className="medRoomInfo">
                        <div className="medRoomTitle purple">
                          {this.jsUcfirst() + ' ' + this.props.roomNumber}
                        </div>
                        <div className='attDv'>
                          <div className='attribute'>
                            <span className="att"><img src={Marker}/></span> {this.jsUcfirst()}
                          </div>
                          <div className='attribute'>
                            <span className="att"><img src={People}/></span> {this.props.capacity} person(s)
                          </div>
                          <div className='attribute'>
                            <span className="att"><img src={Clock}/></span> {this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, "shortTime") : dateFormat(this.props.startTime, "shortDate")}
                          </div>
                        </div>
                        <br/>
                        <div className='attDv'>

                          <div className='attribute'>
                            <span className="att">Duration</span> : {this.props.duration ? this.props.duration : ' '} hour(s)
                          </div>
                          <div className='amenityDv'>
                            <span className="attA">{this.props.amenities}<img src={Coffee} alt='coffee' title="Coffee"/> </span>
                            <span className="attA">{this.props.amenities}<img className='icon' alt='Printer' src={Printer} title="Printer"/> </span>
                            <span className="attA">{this.props.amenities}<img src={Projector} alt='Projector' title="Projector"/> </span>
                          </div>
                        </div>

                      </div>
                    </div>
                      <button className="cancel medCancel" >
                      <p className="cancelTxt">Cancel feature coming soon!</p>
                      <FontAwesomeIcon icon="times" className='ex' />&nbsp;&nbsp;
                          Cancel
                      </button>
                  </div>
                  {this.props.children}
                  <br/>
                  {/*<div className='line2'></div>*/}
                </div>

            ) : (
              <div className='rrBorder ' key={this.state.key}>
                <div className="roomRec2"  img={this.props.img}>

                    <div className="topCard">
                      <div className='currDate'>
                        <div className='currMD'>{this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, 'MM-DD') : dateFormat(this.props.startTime, "mm/dd")}</div>
                        {this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, 'yyyy') : dateFormat(this.props.startTime, "yyyy")}

                      </div>
                      <div className='currLine'></div>
                      <div className='map '>
                        <a href={mapsUrl+this.props.address} target='_blank'>
                        <button className='mapTxt purple'>go to map</button>
                        <img src={Map} className='mapImg'/></a>
                      </div>
                      <div className="roomInfo">
                        <div className="roomTitle purple">
                          {this.jsUcfirst() + ' ' + this.props.roomNumber}
                        </div>
                        <div className='attDv'>
                          <div className='attribute'>
                            <span className="att"><img src={Marker}/></span>&nbsp; {this.jsUcfirst()}
                          </div>
                          <div className='attribute'>
                            <span className="att"><img src={Clock}/></span>  &nbsp;{this.props.startTimes ? dateFormat(this.props.startTimes[0].openTime, "shortTime") +'-'+
                            dateFormat(moment(this.props.startTimes[0]).add(this.props.duration, 'hours').toDate(), "shortTime") : dateFormat(this.props.startTime, "shortTime") +'-'+
                            dateFormat(moment(this.props.startTime).add(this.props.duration, 'hours').toDate(), "shortTime")}
                            {console.log(moment(this.props.startTime).add(this.props.duration, 'hours').toDate())}
                               &nbsp;&nbsp;for &nbsp; {this.props.duration ? this.props.duration : ' '} hour(s)
                          </div>


                        </div>
                        <br/>
                        <div className='attDv'>
                          <div className='attribute'>
                            <span className="att"><img src={People}/></span> &nbsp; {this.props.capacity} person(s)
                          </div>

                          <div className='amenityDv'>
                            <span className="attA">{this.props.amenities}<img src={Coffee} alt='coffee' title="Coffee"/> </span>
                            <span className="attA">{this.props.amenities}<img className='icon' alt='Printer' src={Printer} title="Printer"/> </span>
                            <span className="attA">{this.props.amenities}<img src={Projector} alt='Projector' title="Projector"/> </span>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className='rightSide'>


                      <button className="cancel" >
                      <p className="cancelTxt">Cancel feature coming soon!</p>
                      <FontAwesomeIcon icon="times" className='ex' />&nbsp;&nbsp;
                          Cancel
                      </button>
                    </div>
                  </div>
                  {this.props.children}
                  <br/>
                  {/*<div className='line2'></div>*/}
                </div>
              )
            }
            </Media>
          );
        }
}


export default RoomCard;
