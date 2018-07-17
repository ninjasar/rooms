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
  }

  displayResults() {
    var rArr = [];
    rArr = this.state.srchRes.map((r) => (

        <Card title={r.room.locationId.toLowerCase() + ' ' + r.room.name} key={r.room.name} className="roomRec">
          Occupants: {r.room.capacity}
          <br/>
          Amenities: {r.room.amenities[0].name}
          <br/>
          Open Time: {r.times[0].openTime}
          <br/>
          Close Time: {r.times[0].closeTime}
          <br/>
          Duration: {r.times[0].duration}
        </Card>
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
