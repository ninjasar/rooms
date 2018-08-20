import React from 'react';
import {NavLink} from 'react-router-dom';
import dateFormat from 'dateformat';
//import { DropdownButton, MenuItem, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
//import Banner from '../components/Banner/Banner.js';
//import RoomRec from '../components/mainMenu/RoomRec.js';
//import pic from '../components/mainMenu/pic.jpeg';
//import Transparent from './Transparent.js';
import '../index.css';
import './search.css';
import './Home.css';
import API from '../utils';
import Card from '../components/booking/Card';
import Filter from '../components/booking/Filter';
import LandingPg from './LandingPg.js';

class currentReservePg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
    };
  }

  componentWillMount() {
    for(var a = 0; a<2; a++) {
      API.getUsersReservations()
        .then((res) => {
             this.setState({
               reservations: res,
             });
        }).catch((error) => {
          this.setState({
            eMessage: error,
          });
          console.log(error);
        });

    }
  }




  sortReservations() {
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

export default currentReservePg;


/*
{props.loggedIn && <Banner/>}
{props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pict}/>} */
