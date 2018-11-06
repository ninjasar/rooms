import React from 'react';
import {NavLink} from 'react-router-dom';
import dateFormat from 'dateformat';


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
  }

  async componentDidMount() {

      let reservations = await API.getUsersReservations();
      let locs = await API.getLocs();
      this.setState({ reservations, locs });
  }




  sortReservations() {
    this.state.reservations.forEach((room) => {
      let i = this.state.locs.idArray.indexOf(room.locationId);
          this.addresses = {...this.addresses, [room.locationId]: this.state.locs.data[i].address,};
    });
    console.log(this.addresses);
    this.state.reservations.forEach((room) => {
      this.roomCards.push(<RoomCard key={room.roomId} isRoomRec={false} img={recImg} bldg={room.locationId}
          roomNumber={room.vendorRoomId} capacity={room.occupants}  startTime={room.reserveTime}
          duration={room.duration} address={this.addresses[room.locationId]}>
          </RoomCard>);
    });

    //console.log(this.roomCards);
  }




  render () {
    this.sortReservations();
    return (
      <div className='biggerContain'>
        <div className='btnContain'>
          <button className='sortRes sRActive'>
          Current Reservations
          </button>
          <button className='sortRes '>
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
