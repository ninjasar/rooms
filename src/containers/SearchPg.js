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
      startTime: moment().toDate(),
      endTime: moment().add(1, 'day').hour(0).toDate(),
      eMessage: '',
      srchRes: {},
      wsq: [],
      bkln: [],
      bobst: false,
      questions: [],
      locs: [],
      key: ';myname',
      reserve: () => {console.log('hello')},
    };
    this.applySearch = this.applySearch.bind(this);
    this.srchCmp = [];
    this.instantRes = [];
    this.getJSXResultsByBldg = this.getJSXResultsByBldg.bind(this);
  }

  //makes api calls for default results
  defaultRes = async () => {

      let locs = [];
      let srchRes = [];

    try {

      locs = await API.getLocs();
      srchRes = await API.search(this.state.startTime, this.state.endTime);
      this.setState({ locs, srchRes });

    } catch(eMessage) {

      this.setState({ eMessage });

    }

      //calls this function to get the vacancies per building data
      let res = this.getNumVacByBldg(srchRes, locs.idArray);
      return res;

  }

  getNumVacByBldg = (srchRes, locs) => {

    const counts = {};
    srchRes.forEach((res/*, i*/) => {

      const loc = res.room.locationId;
      counts[loc] = 0;
      // let currLocProps = {
      //   locationId: loc,
      //   vacancies: 0,
      // };
      //console.log(currLocProps);
      if (counts[loc] !== NaN) {
        counts[loc] += res.times.length;
      }
      //counts[i] = currLocProps;
    });

    return counts;
  }

  async componentDidMount() {
    //console.log(this.defaultRes());
    let test = await this.defaultRes();
    console.log(test);
    this.instantRes = this.getJSXResultsByBldg(test);
    console.log(this.instantRes);
    this.setState({
      key: 'heythere'
    });
      // API.getLocInfo('BOBST')
      //   .then((results) => {
      //     //console.log(results);
      //   }).catch((error) => {
      //     console.log(error);
      // });

  }

  getJSXResultsByBldg(bldgCts) {
    let rArr = [];
    rArr[0] = Object.entries(bldgCts).map((vArray) => {
      let lName = '';

      if(this.state.locs) {
        var locs = this.state.locs.data;
        // for(let a = 0; a<loc.length; a++){
        //   if(loc[a].id === vArray[0]) {
        //       if(loc[a].id === 'BOBST') {
        //         this.setState({
        //           bobst : vArray[1]
        //         });
        //       }
        //       lName = loc[a].name;
        //     }
        // }
        locs.forEach((loc) => {

          if(loc.id === vArray[0]) {
            if(loc.id === 'BOBST') {
              this.setState({
                bobst : vArray[1]
              });
            }
            lName = loc.name;
          }
        });
      }

      return (
        <Card className="locationResultsCard" key={vArray[0]} onClick={() => 0}>
          <div className="locationResult">
            {lName} : {vArray[1]} <span className="vNum">room(s)</span>
          </div>
        </Card>
      );
    });
    return rArr;
  }

/*Display results is creating a list of links that will */
  getRCResults() {
    //console.log(this.state.srchRes);
    let rArr = [];
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
        this.getRCResults();
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
                {this.instantRes || this.srchCmp}
              </Card>
            </div>



      </div>
    )

  }



}


export default SearchPg;
