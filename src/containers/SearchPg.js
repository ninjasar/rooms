import React from 'react';

//import Transparent from './Transparent.js';

import API from '../utils';
import Card from '../components/booking/Card';
import Filter from '../components/booking/Filter';
import './search.css';





class SearchPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occupants: 2,
      duration: 1,
      location: [2,4],
      eMessage: '',
    };
  }

  componentWillMount() {
    API.closest(this.state.location)
      .then((closestRoom) => {
        if(this.state.occupants===1) {
          this.setState({
            closestIndividual: closestRoom,
            locationOfRoom: closestRoom.location.toLowerCase(),
          });
        } else {
          this.setState({
            closestGroup: closestRoom,
          });
        }
        console.log(this.state.closestIndividual)
      }).catch((error) => {
        this.setState({
          eMessage: error,
        });
        console.log(error);
      });

  }




  render () {
    return (
      <div className='container'>
          <Filter homePg={true}/>
          <Card title="Individual">
            Building: {this.state.locationOfRoom}
          </Card>
      </div>
    )

  }



}


export default SearchPg;
