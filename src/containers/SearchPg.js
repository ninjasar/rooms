import React from 'react';
import dateFormat from 'dateformat';
//import {NavLink} from 'react-router-dom';
import moment from 'moment';
import Accordion from 'react-collapsy';


import recImg from './recImg.png';
import API from '../utils';
import Card from '../components/booking/Card';
import Filter from '../components/booking/Filter';
import RoomCard from '../components/booking/RoomCard';
import './search.css';
import '../god.css';
//import '../../node_modules/react-collapsy/lib/index.css';





class SearchPg extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      occupants: 2,
      duration: 1,
      locs: [],
      startTime: moment().toDate(),
      endTime: moment().add(1, 'day').hour(0).toDate(),
      eMessage: '',
      srchRes: {},
      bobst: false,
      questions: [],
      key: ';myname',
    };
    this.applySearch = this.applySearch.bind(this);
    this.wsq = [];
    this.bkln = [];
    this.srchCmp = [];
    this.instantRes = [];
    this.getJSXResultsByBldg = this.getJSXResultsByBldg.bind(this);
  }

  //makes api calls for default results and passes loc array on to sort by bldg fn
   defaultRes = async () => {

      let locs = [];
      let srchRes = [];
      const extraRes = {
        "room": {
          "id": "Kimmel42069",
          "vendorId": 123,
          "name": "420-69",
          "locationId": "KIMMEL",
          "amenities": [
            {
              "name": "Coffee",
              "id": 12
            }
          ],
          "capacity": 5
        },
        "times": [
          {
            "openTime": "2007-04-05T12:30-02:00",
            "duration": 1,
            "closeTime": "2007-04-05T12:30-02:00"
          },
          {
            "openTime": "2007-04-05T9:30-02:00",
            "duration": 1,
            "closeTime": "2007-04-05T12:30-02:00"
          },
        ]
      };

        try {
          locs = await API.getLocs();
          srchRes = await API.search(this.state.startTime, this.state.endTime);
          locs.data.push({
            "name": "Kimmel Student Center",
            "id": "KIMMEL",
            "message": "This location is under construction. Room reservations at this location is only accessible for entrepreneurial activities.",
            "defaultAmenities": [
              {
                "name": "Coffee",
                "id": 12
              }
            ],
            "address": "70 Washington Square S, New York, NY 10012",
            "campus": "wsq",
            "latitude": 40.729619,
            "longitude": -73.997025
          });
          srchRes.push(extraRes);
        this.setState({ locs, srchRes });
      } catch(eMessage) {

        this.setState({ eMessage });

      }

    console.log(this.state.locs);

      //calls this function to get the vacancies per building data
      let res = this.getNumVacByBldg(srchRes, locs.idArray);
      return res;

  }

  getNumVacByBldg = (srchRes, locs) => {
    const counts = {};
    locs.forEach((l) =>{
      counts[l] = 0;
    });
    srchRes.forEach((res) => {
      const loc = res.room.locationId;
      if (counts[loc] !== NaN) {
        counts[loc] += res.times.length;
      }
    });

    return counts;
  }

  async componentDidMount() {
    let roomCt = await this.defaultRes();
    console.log(this.state.locs);

    this.instantRes = this.getJSXResultsByBldg(roomCt);
    console.log(this.instantRes);
    this.setState({
      key: 'heythere'
    });

  }

  getJSXResultsByBldg(bldgCts) {
    let rArr = [];
    let localBobst = false;
    let localBobstVal = 0;
    rArr[0] = Object.entries(bldgCts).map((vArray) => {
      let lName = '';

      if(this.state.locs) {
        var locs = this.state.locs.data;

        locs.forEach((loc) => {

          if(loc.id === vArray[0]) {
            if(loc.id === 'BOBST') {
              this.setState({
                bobst : vArray[1]
              });
              localBobst = true;
              localBobstVal = vArray[1];
            }
            if(loc.name)
              lName = loc.name;
            else lName = loc.id;
          }
        });
      }

      if(localBobst) {
        localBobst = false;
        return " ";
      }

      return (

          <div className='locResDv' key={vArray[0]} onClick={() => this.bldgViewToRes(vArray[0])}>
            <div className="locationResult">
              <span className="locName">{lName}</span>
              <div>
                <span className={(vArray[1] === 0) ? "vNumNone" : "vNum"}>
                  {vArray[1]}
                </span>
                 &nbsp;&nbsp;room(s)
              </div>
            </div>
          </div>

      );
    });
    rArr.push(
        <div className='locResDv' key='b' onClick={() => this.bldgViewToRes('BOBST')}>
          <div className="locationResult">
            <span className="locName">Bobst Library</span>
            <div>
              <span className={(localBobstVal === 0) ? "vNumNone" : "vNum"}>
                {localBobstVal}
              </span>
               &nbsp;&nbsp;room(s)
            </div>
          </div>
        </div>
    );

    this.setState({
      key: 'im so done rn',
    });
    return rArr;
  }

  bldgViewToRes = async (bldgId) => {
    const {startTime, endTime, duration, amenities, occupants} = this.state;
    let apiRes = await API.search(startTime, endTime, duration, bldgId, amenities, occupants);
    this.setState({
      srchRes: apiRes
    });
    let res = this.getRCResults();
    this.srchCmp = res;
    this.setState({
      key: 'seriouslyfuckyou'
    });
    return res;
  }


/*Display results is creating a list of links that will */
  getRCResults() {
    let rArr = [];
    rArr = this.state.srchRes.map((r) => {
      r.times.push({openTime: '2007-04-05T13:30-02:00'}, {openTime: '2007-04-05T07:30-02:00'});
      return (
        <RoomCard key={r.room.name} bigTitle={true} img={recImg} bldg={r.room.locationId.toLowerCase()}
          roomNumber={r.room.name} capacity={r.room.capacity} startTimes={r.times} duration={r.times[0].duration}>
        </RoomCard>
        )
      }
    );
    this.srchCmp = rArr;
      return rArr;
  }


  applySearch = async ( openTime, closeTime, duration, locations, amenities, occupants) => {
    let roomsForlocsSelected = [];
    this.setState({
      duration,
      occupants,
      amenities,
      startTime: openTime,
      endTime: closeTime
    });
    API.search(openTime, closeTime, duration, locations, amenities, occupants)
      .then((results) => {
          this.setState({
            srchRes: results,
          });
        this.srchCmp = [];
        console.log(this.state.locs);
        roomsForlocsSelected = this.getNumVacByBldg(this.state.srchRes, this.state.locs.idArray);
        console.log(roomsForlocsSelected);
        this.instantRes = this.getJSXResultsByBldg(roomsForlocsSelected);
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
                <span className="recTitle purple">Results:</span>
                <br/>
                <br/>
                {(this.srchCmp.length !== 0) ? (this.srchCmp) : this.instantRes}
              </Card>
            </div>



      </div>
    )

  }



}


export default SearchPg;
