import React from 'react';
import {NavLink} from 'react-router-dom';
import dateFormat from 'dateformat';


import API from '../utils.js';

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
        <div className="roomRecContain">

            <NavLink to='/advancedSearch' className="srchBtn">
              Advanced Search
            </NavLink>
        </div>
      </div>
    )

  }



}

export default currentReservePg;


/*
{props.loggedIn && <Banner/>}
{props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pict}/>} */
