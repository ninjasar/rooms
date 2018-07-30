import React from 'react';
import {NavLink} from 'react-router-dom';
import dateFormat from 'dateformat';

import '../index.css';
import './search.css';
import './Home.css';
import API from '../utils';
import Card from '../components/booking/Card';
import Filter from '../components/booking/Filter';
import LandingPg from './LandingPg.js';


const getLocation = () => {
  const geolocation = navigator.geolocation;

  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject (new Error('Permission denied'));
    });
  });
  return location;
};

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

  componentWillMount() {
    this.filterRecs(1, this.state.duration, this.state.occupants);
    // for(var a = 0; a<2; a++) {
    //   API.closest(this.state.userLocation, this.state.duration, this.state.occupants)
    //     .then((closestRoom) => {
    //        if(this.state.occupants === 1){
    //          this.setState({
    //            closestIndividual: closestRoom,
    //            locationOfRoom1: closestRoom.location.toLowerCase(),
    //            roomNumber1: closestRoom.roomNumber,
    //            capacity1: closestRoom.capacity,
    //            openTime1: closestRoom.openTime,
    //            duration1: closestRoom.duration,
    //            closeTime1: closestRoom.closeTime,
    //          });
    //        } else {
    //         this.setState({
    //           closestGroup: closestRoom,
    //           locationOfRoom2: closestRoom.location.toLowerCase(),
    //           capacity2: closestRoom.capacity,
    //           roomNumber2: closestRoom.roomNumber,
    //           openTime2: closestRoom.openTime,
    //           duration2: closestRoom.duration,
    //           closeTime2: closestRoom.closeTime,
    //         });
    //       }
    //       // console.log(this.state.closestIndividual);
    //       // console.log(this.state.closestGroup);
    //       this.setState({
    //         occupants: this.state.occupants+1,
    //       });
    //     }).catch((error) => {
    //       this.setState({
    //         eMessage: error,
    //       });
    //       console.log(error);
    //     });
    //
    // }
  }
  //on filter change, recall the api with updated parameters for both individual and
  //group rooms
  filterRecs(event, duration) {
    console.log('works');

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
              roomNumber2: closestRoom.roomNumber,
              openTime2: closestRoom.openTime,
              duration2: closestRoom.duration,
              closeTime2: closestRoom.closeTime,
            });
          }
          //add one to occupants so we get a group response then loop
          console.log(closestRoom);
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
        <Filter homePg={true} apply={this.filterRecs.bind(this)}/>
        <div className="roomRecContain">
          <Card title="Individual" bigTitle={true} className="roomRec">
            Building: {this.state.locationOfRoom1}
            <br/>
            Capacity: {this.state.capacity1}
            <br/>
            Duration: {this.state.duration1} hour(s)
            <br/>
            Number: {this.state.roomNumber1}
            <br/>
            Start Time: {dateFormat(this.state.openTime1, 'default')}
          </Card>
          <Card title="Group" bigTitle={true} className="roomRec">
            Building: {this.state.locationOfRoom2}
            <br/>
            Capacity: {this.state.capacity1}
            <br/>
            Duration: {this.state.duration2} hour(s)
            <br/>
            Number: {this.state.roomNumber2}
            <br/>
            Start Time: {dateFormat(this.state.openTime2, 'default')}
          </Card>
          <Card className="roomRec">
            Don't like these rooms?
            <br/>
            <br/>
            <NavLink to='/advancedSearch' className="srchBtn">
              Advanced Search
            </NavLink>
          </Card>
        </div>
          {!this.props.loggedIn && <LandingPg loginClicked={this.props.login}/>}
      </div>
    )

  }



}

export default HomePg;


/*
{props.loggedIn && <Banner/>}
{props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pict}/>} */
