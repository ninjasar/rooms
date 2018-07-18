import React from 'react';
import dateFormat from 'dateformat';
import {NavLink} from 'react-router-dom';

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
      srchRes: {},
      results: [<div key="hey"></div>]
    };
    this.displayResults = this.displayResults.bind(this);

  }

  componentDidMount() {
    API.search()
      .then((results) => {
          this.setState({
            srchRes: results,
            // results: Object.entries(results).map(item => ({[item[0]]:item[1]})),
          });
        //console.log(this.state.srchRes)
      }).catch((error) => {
        this.setState({
          eMessage: error,
        });
        console.log(error);
      });
    API.getLocs()
      .then((results) => {
        console.log(results.idArray);
      }).catch((error) =>  {
      this.setState({
          eMessage: error,
        });
        console.log(error);
      });
      API.getLocInfo('BOBST')
        .then((results) => {
          console.log(results);
        }).catch((error) => {
          console.log(error);
      });

  }



/*Display results is creating a list of links that will open a modal with*/
  displayResults() {
    var rArr = [];
    rArr = this.state.srchRes.map((r) => (
         <NavLink to="/confirmReservation" >
          <Card title={r.room.locationId.toLowerCase() + ' ' + r.room.name} key={r.room.name} className="roomRec">
            <span className="rmAttribute">Occupants: </span>{r.room.capacity}
            <br/>
            <br/>
            <span className="rmAttribute">Time: </span>{dateFormat(r.times[0].openTime, 'default')}
            <br/>
            <br/>
            <span className="rmAttribute">Duration: </span>{r.times[0].duration} hour(s)
            <br/>
            <br/>
            <span className="rmAttribute">Amenities: </span>{r.room.amenities[0].name}
          </Card>
        </NavLink>
      )
    );
    // this.setState({
    //   results:
    //         }
    //       )
    //
    //   });
      //console.log(rArr);
      this.setState({
        results: rArr,
      });
      return rArr;
  }



  render () {
    var x = [];
    return (

      <div className='container'>
          <Filter homePg={true} apply={this.displayResults}/>
            <div className="roomRecContain">
              <div>
                {this.state.results}
              </div>

            </div>



      </div>
    )

  }



}


export default SearchPg;
