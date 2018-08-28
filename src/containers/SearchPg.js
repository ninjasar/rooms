import React from 'react';
import dateFormat from 'dateformat';
//import {NavLink} from 'react-router-dom';
import 'datejs';
import moment from 'moment';
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
      startTime: new Date(),
      endTime: Date.parse('tomorrow'),
      eMessage: '',
      srchRes: {},
      questions: [],
      locs: [],
      key: ';myname',
      reserve: () => {console.log('hello')},
    };
    this.applySearch = this.applySearch.bind(this);
    this.srchCmp = [];
  }

  //makes api calls for default results
  defaultRes = async () => {

    // await API.getLocs()
    //   .then((results) => {
    //     //console.log(results.idArray);
    //     locs = results;
    //     this.setState({
    //       locs: results,
    //     });
    //   }).catch((error) =>  {
    //   this.setState({
    //       eMessage: error,
    //     });
    //     console.log(error);
    //   });
      //console.log(this.state.startTime, this.state.endTime);
      let locs = [];
      let srchRes = [];

    try {

      locs = await API.getLocs();
      srchRes = await API.search(this.state.startTime, this.state.endTime);
      this.setState({ locs, srchRes });

    } catch(eMessage) {

      this.setState({ eMessage });

    }


    // await API.search(this.state.startTime, this.state.endTime)
    //   .then((results) => {
    //     srchResNow = results;
    //       this.setState({
    //         srchRes: results,
    //       });
    //   }).catch((error) => {
    //     this.setState({
    //       eMessage: error,
    //     });
    //     console.log(error);
    //   });

      //calls this function to get the vacancies per building data
      let res = this.getSrchResByBldg(srchRes, locs.idArray);
      return res;

  }

  getSrchResByBldg = (srchRes, locs) => {
    //console.log(results, locs);
    //location object for dynamically creating arrays for each location

    const counts = {};
    locs.forEach((loc) => {
      counts[loc] = 0;
    })
    //console.log(counts);
    srchRes.forEach((res) => {

      const loc = res.room.locationId;
      if (counts[loc]) { counts[loc] += res.times.length; }
      console.log(counts[loc]);
    });
    console.log(srchRes);
    return counts;
  }

  async componentDidMount() {
    //console.log(this.defaultRes());
    let test = await this.defaultRes();
    console.log(test);
      // API.getLocInfo('BOBST')
      //   .then((results) => {
      //     //console.log(results);
      //   }).catch((error) => {
      //     console.log(error);
      // });

  }



/*Display results is creating a list of links that will open a modal with*/
  displayResults() {
    //console.log(this.state.srchRes);
    var rArr = [];
    rArr = this.state.srchRes.map((r) => (

      <RoomCard key={r.room.name} bigTitle={true} img={recImg} bldg={r.room.locationId.toLowerCase()}
        roomNumber={r.room.name} capacity={r.room.capacity} startTimes={r.times} duration={r.times[0].duration}>
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
          });
        //console.log(this.state.srchRes);
        this.displayResults();
      }).catch((error) => {
        this.setState({
          eMessage: error,
        });
        console.log(error);
      });
      return 0;
  }

  getQsObj(qs, name) {

  }

   showQuestions = async () => {
    // console.log(this.state.srchRes)
    // console.log(this.state.srchRes);
    const proms = this.state.srchRes.map((r) => { API.getLocInfo(r.locationId) });

    //const questions = await Promise.all(proms);

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
              <Card>
                <span className="recTitle">Results:</span>
                <br/>
                <br/>
                {this.srchCmp}
              </Card>
            </div>



      </div>
    )

  }



}


export default SearchPg;
