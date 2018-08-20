import React from 'react';
import dateFormat from 'dateformat';
import {NavLink} from 'react-router-dom';
import Accordion from 'react-collapsy';

//import Transparent from './Transparent.js';

import recImg from './recImg.png';
import API from '../utils';
import Card from '../components/booking/Card';
import Filter from '../components/booking/Filter';
import RoomCard from '../components/booking/RoomCard';
import './search.css';
import '../../node_modules/react-collapsy/lib/index.css';





class SearchPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occupants: 2,
      duration: 1,
      location: [2,4],
      startTime: '',
      eMessage: '',
      srchRes: {},
      questions: [],
      key: ';myname',
      reserve: () => {console.log('hello')},
    };
    this.applySearch = this.applySearch.bind(this);
    this.srchCmp = [];
  }



  componentDidMount() {
    // API.search()
    //   .then((results) => {
    //       this.setState({
    //         srchRes: results,
    //         // results: Object.entries(results).map(item => ({[item[0]]:item[1]})),
    //       });
    //     //console.log(this.state.srchRes)
    //   }).catch((error) => {
    //     this.setState({
    //       eMessage: error,
    //     });
    //     console.log(error);
    //   });
    // API.getLocs()
    //   .then((results) => {
    //     console.log(results.idArray);
    //   }).catch((error) =>  {
    //   this.setState({
    //       eMessage: error,
    //     });
    //     console.log(error);
    //   });
      API.getLocInfo('BOBST')
        .then((results) => {
          console.log(results);
        }).catch((error) => {
          console.log(error);
      });

  }

/*Display results is creating a list of links that will open a modal with*/
  displayResults() {
    console.log(this.state.srchRes);
    var rArr = [];
    rArr = this.state.srchRes.map((r) => (

      <RoomCard key={r.room.name} bigTitle={true} img={recImg} bldg={r.room.locationId.toLowerCase()}
        roomNumber={r.room.name} capacity={r.room.capacity} startTime={r.room.openTime}>
      </RoomCard>
      )
    );
    this.srchCmp = rArr;
    this.setState({
      key: 'jfkdlfd',
    });
      return rArr;
  }

  applySearch = async ( openTime, closeTime, duration, locations, amenties, occupants) => {
      //event.preventDefault();
    API.search(openTime, closeTime, duration, locations, amenties, occupants)
      .then((results) => {
          this.setState({
            srchRes: results,
            // results: Object.entries(results).map(item => ({[item[0]]:item[1]})),
          });
        console.log(this.state.srchRes);
        this.displayResults();
      }).catch((error) => {
        this.setState({
          eMessage: error,
        });
        console.log(error);
      });

  }

  getQsObj(qs, name) {

  }

   showQuestions = async () => {
    // console.log(this.state.srchRes)
    // console.log(this.state.srchRes);
    const proms = this.state.srchRes.map((r) => { API.getLocInfo(r.locationId) });

    const questions = await Promise.all(proms);

    this.setState({

    });
  }






  render () {
    var x = [];


    return (

      <div className='container' key={this.state.key}>
        <div className="leftContain">
          <Filter homePg={true} apply={() => {this.applySearch()} } search={true}/>
        </div>
            <div className="roomRecContain">
              <div>
                {this.srchCmp}
              </div>

            </div>



      </div>
    )

  }



}


export default SearchPg;
