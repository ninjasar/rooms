import React from 'react';
import {NavLink} from 'react-router-dom';
import dateFormat from 'dateformat';
import moment from 'moment';


import API from '../utils.js';
import Card from '../components/booking/Card.js';
import RoomCard from '../components/booking/RoomCard.js';
import recImg from './recImg.png';
import './currentRes.css';
import '../god.css';

class currentReservePg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      key: 'm',
      current: true,
      past: false,
      locs: [],

    };
    this.addresses= {};
    this.roomCards = [];
    this.showCurrent = this.showCurrent.bind(this);
    this.showPast = this.showPast.bind(this);
  }

  async componentDidMount() {

      let reservations = await API.getUsersReservations();
      let locs = await API.getLocs();
      this.setState({ reservations, locs });
      this.state.reservations.forEach((room) => {
        let i = this.state.locs.idArray.indexOf(room.locationId);
            this.addresses = {...this.addresses,
              [room.locationId]: this.state.locs.data[i].address,
            };
      });
      this.showCurrent();

  }





  showReservations() {

    console.log(this.addresses);
    this.state.reservations.forEach((room) => {
      this.roomCards.push(<RoomCard key={room.roomId} isRoomRec={false} img={recImg} bldg={room.locationId}
          roomNumber={room.vendorRoomId} capacity={room.occupants}  startTime={room.reserveTime}
          duration={room.duration} address={this.addresses[room.locationId]}>
          </RoomCard>);
    });

    //console.log(this.roomCards);
  }

   showCurrent() {
     this.roomCards = this.state.reservations.map((room) => {
       console.log(moment().isSameOrAfter(room.reserveTime));
       if(moment().isSameOrBefore(room.reserveTime)){
         return (<RoomCard key={room.roomId} isRoomRec={false} img={recImg} bldg={room.locationId}
             roomNumber={room.vendorRoomId} capacity={room.occupants}  startTime={room.reserveTime}
             duration={room.duration} address={this.addresses[room.locationId]}>
             </RoomCard>);
       }
     });
     this.setState({
       key: 'l',
       past: false,
       current: true,
     });
   }

   showPast() {
     this.roomCards = this.state.reservations.map((room) => {
       console.log(moment().isSameOrBefore(room.reserveTime));
       if(moment().isSameOrAfter(room.reserveTime)){
         return (<RoomCard key={room.roomId} isRoomRec={false} img={recImg} bldg={room.locationId}
             roomNumber={room.vendorRoomId} capacity={room.occupants}  startTime={room.reserveTime}
             duration={room.duration} address={this.addresses[room.locationId]}>
             </RoomCard>);
       }
     });
     this.setState({
       key: 'r',
       past: true,
       current: false,
     });
   }




  render () {
    return (
      <div className='biggerContain' key={this.state.key}>
        <div className='btnContain'>
          <button onClick={this.showCurrent} className={'sortRes ' + (this.state.current && ' sRActive' )}>
          Current Reservations
          </button>
          <button onClick={this.showPast} className={'sortRes ' + (this.state.past && ' sRActive' )}>
          Past Reservations
          </button>
        </div>
        <div className='currResContain' key={this.state.key}>
          {this.roomCards}
        </div>
      </div>
    )

  }



}

export default currentReservePg;


/*
{props.loggedIn && <Banner/>}
{props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pict}/>} */
