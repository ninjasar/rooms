import React from 'react';
import {NavLink} from 'react-router-dom';
import Media from 'react-media';
//import dateFormat from 'dateformat';

import '../index.css';
import './search.css';
import '../god.css';
import './Home.css';
import recImg from './recImg.png';
import API from '../utils';
import Card from '../components/booking/Card';
import RoomCard from '../components/booking/RoomCard';
import Filter from '../components/booking/Filter';
import LandingPg from './LandingPg.js';


class HomePg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occupants: 1,
      duration: 1,
      closestIndividual: {},
      closestGroup: '{}',
      userLocation: this.props.location,
      eMessage: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.filterRecs(1, this.state.duration, this.state.occupants);
  }
  //on filter change, recall the api with updated parameters for both individual and
  //group rooms
  filterRecs(event, duration) {

    if(event !== 1)
      event.preventDefault();
      //must call twice because closest only returns one room at a time
      //call once for individual and make occupants 1
    for(var a = 0; a<2; a++) {
      API.closest(this.state.userLocation, duration, this.state.occupants)
        .then((closestRoom) => {
           if(this.state.occupants === 1){
             this.setState({
               closestIndividual: closestRoom,
               locationOfRoom1: closestRoom.location.toLowerCase(),
               roomNumber1: closestRoom.roomNumber,
               roomId1: closestRoom.id,
               capacity1: closestRoom.capacity,
               openTime1: closestRoom.openTime,
               duration1: closestRoom.duration,
               closeTime1: closestRoom.closeTime,
             });
             //console.log(closestRoom);
           } else {
            this.setState({
              closestGroup: closestRoom,
              locationOfRoom2: closestRoom.location.toLowerCase(),
              capacity2: closestRoom.capacity,
              roomId2: closestRoom.id,
              roomNumber2: closestRoom.roomNumber,
              openTime2: closestRoom.openTime,
              duration2: closestRoom.duration,
              closeTime2: closestRoom.closeTime,
            });
          }
          //add one to occupants so we get a group response then loop
          //console.log(closestRoom);
          this.setState({
            occupants: this.state.occupants+1,
          });
        }).catch((error) => {
          this.setState({
            eMessage: error,
          });
          console.log(error);
        });
      }


  }




  render () {
    return (
      <div className='container'>
        <div className="leftContain">
          <Card srchBtn={true}>
            <div className="advancedSearchCard normalCol">
              <br/>
                Don't like these rooms?
                <br/>
                <br/>
                To get your favorite room
                <br/>
                at a future time try:
                <br/>
                <br/>
                <br/>
                <div className="srchBtnDv">
                  <NavLink to='/advancedSearch' className="srchBtn pink">
                    Advanced Search
                  </NavLink>
                </div>
                <br/>
                <br/>
            </div>
          </Card>
          <Filter homePg={true} apply={this.filterRecs.bind(this)}/>
        </div>
        <div className="roomRecContain">
          <Card>
            <br/>
            &nbsp;&nbsp;&nbsp;<span className="recTitle purple">Recommended Rooms</span>
            <br/>
            <br/>
            <br/>
            <span className="typeOfR">&nbsp;&nbsp;&nbsp;Individual</span>
            <br/>
            <RoomCard bigTitle={true} img={recImg} bldg={this.state.locationOfRoom1} isRoomRec={true}
                roomNumber={this.state.roomNumber1} capacity={this.state.capacity1} id={this.state.roomId1} history={this.props.history} startTime={this.state.openTime1} duration={this.state.duration1}>
            </RoomCard>
            <br/>
            <br/>
            <span className="typeOfR">&nbsp;&nbsp;&nbsp;Group</span>
            <br/>
          <RoomCard bigTitle={true} img={recImg} bldg={this.state.locationOfRoom2} isRoomRec={true}
            roomNumber={this.state.roomNumber2} capacity={this.state.capacity2} id={this.state.roomId2} history={this.props.history} startTime={this.state.openTime2} duration={this.state.duration2}>
            </RoomCard>
            <br/>
            <br/>
          </Card>

        </div>

          {!this.props.loggedIn && <LandingPg loginClicked={this.props.login}/>}
      </div>
    )

  }



}

export default HomePg;
