import React from 'react';
import dateFormat from 'dateformat';
//import {NavLink} from 'react-router-dom';
import moment from 'moment';
import Accordion from 'react-collapsy';
import Media from 'react-media';


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
      locations: [],
      srchRes: {},
      bobst: false,
      questions: [],
      key: ';myname',
    };
    this.applySearch = this.applySearch.bind(this);
    this.bldgClicked = '';
    this.wsq = [];
    this.bkln = [];
    this.srchCmp = [];
    this.instantRes = [];
    this.getJSXResultsByBldg = this.getJSXResultsByBldg.bind(this);
  }

  //makes api calls for default results and passes loc array on to sort by bldg fn
   defaultRes = async () => {

      let locs = {};
      let srchRes = [];

      if(this.state.locations.length !== 0) {
        try{
          for(var a =0; a<this.state.locations.length; a++){
            locs.data = [];
            var curr = await API.getLocInfo(this.state.locations[a]);
            locs.data.push(curr);
          }

          locs.idArray = this.state.locations;
        } catch(eMessage) {
          this.setState({ eMessage });
        }

      }
      else {
        try {
          locs = await API.getLocs();
          console.log('start: ' + this.state.startTime + ' end: ' + this.state.endTime)
          srchRes = await API.search(this.state.startTime, this.state.endTime);
          this.setState({ locs, srchRes });
        } catch(eMessage) {

          this.setState({ eMessage });

        }
      }

      //calls this function to get the vacancies per building data
      let res = this.getNumVacByBldg(srchRes, locs.idArray);
      return res;

  }

  getNumVacByBldg = (srchRes, locs) => {
    //console.log(this.state.srchRes)
    const counts = {};
    locs.forEach((l) =>{
      counts[l] = 0;
    });
    console.log(counts);
    srchRes.forEach((res) => {
      const loc = res.room.locationId;
      if (!isNaN(counts[loc])) {
        counts[loc] += res.times.length;
      }
    });
    console.log(counts);
    return counts;
  }

  async componentDidMount() {
    let roomCt = await this.defaultRes();


    this.instantRes = this.getJSXResultsByBldg(roomCt);
    //console.log(this.instantRes);
    this.setState({
      key: 'jfkd'
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
                 &nbsp;&nbsp;vacancies
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
               &nbsp;&nbsp;vacancies
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
    console.log(bldgId);
    this.setState({
      srchRes: apiRes,
      locations: bldgId
    });
    let res = this.getRCResults(bldgId);
    this.srchCmp = res;
    this.setState({
      key: 'seriouy kls'
    });
    return res;
  }


/*Display results is creating a list of roomcards that will */
  getRCResults(bldg) {
    let rArr = [];
    rArr = this.state.srchRes.map((r) => {
      if(r.room.locationId == bldg) {
        return (
          <RoomCard key={r.room.name} id={r.room.id} img={recImg} isRoomRec={true} bldg={r.room.locationId.toLowerCase()}
            roomNumber={r.room.name} capacity={r.room.capacity} startTimes={r.times} amenity={''} duration={r.times[0].duration}>
          </RoomCard>
          )
        }
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
      locations,
      startTime: openTime,
      endTime: closeTime
    });
    API.search(openTime, closeTime, duration, locations, amenities, occupants)
      .then((results) => {
          this.setState({
            srchRes: results,
            locations: locations,
          });
        this.srchCmp = [];
        roomsForlocsSelected = this.getNumVacByBldg(this.state.srchRes, this.state.locs.idArray);
        this.instantRes = this.getJSXResultsByBldg(roomsForlocsSelected);
      }).catch((error) => {
        this.setState({
          eMessage: error,
        });
        console.log(error);
      });

      return 0;
  }

  render () {


    return (

      <div className='container' key={this.state.key}>
        <div className="leftContain2">
          <Filter duration={this.state.duration} homePg={true} apply={this.applySearch} search={true}/>
        </div>
            <div className="roomRecContain2">
              <Card bigTitle='Results:'>
              {/*<span className="recTitle purple">Results:</span>*/}
                {(this.srchCmp.length !== 0) ? (this.srchCmp) : this.instantRes}
              </Card>
            </div>
      </div>
    )

  }



}


export default SearchPg;
