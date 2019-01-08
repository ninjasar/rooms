import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import dateFormat from 'dateformat';
import 'datejs';
import moment from 'moment';
import Calendar from 'react-calendar';
import Accordion from 'react-collapsy';

import API from '../../utils';
import Card from './Card.js';
import '../../../node_modules/react-collapsy/lib/index.css';
import './filter.css';
import '../../god.css';




class Filter extends Card {

  constructor(props) {
    super(props);

    const d = new Date();
    this.duration = 2;
      this.state = {
        duration: 2,
        locations: [],
        locationIds: [],
        occupants: 1,
        date: d,
        oldOT: moment().startOf('hour'),
        openTime: moment().startOf('hour'),
        closeTime: moment().startOf('hour').add(this.props.duration, 'hour'),
        startHour: moment().startOf('hour').hour(),
        endHour:  moment().startOf('hour').add(this.props.duration, 'hour').hour(),
        isSearch: this.props.search || false,
        wrapper: 'w',
        amensCoffee: false,
        amensPrinter: false,
        amensProjector: false,
        amensSofa: false,
        random: 'y'
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.apply = this.props.apply;

      this.reserve = this.props.reserve;
      this.wrapper = 'lkjfklsklfdslk';

    }

  componentDidMount() {
    API.getLocs()
      .then((results) => {
        this.setState({
          locationIds: results.idArray,
          locations: results.data
        });
        if(this.state.locationIds) {
          this.state.locationIds.forEach((loc) => {
            this.setState({
              loc: false,
            });
          });
        }
        if(this.props.homePg) {
          this.setState({
            occupants: 1,
          });
        }
      }).catch((error) =>  {
      this.setState({
          eMessage: error,
        });
        console.log(error);
      });

      if(!this.state.openTime.date() === moment().date()){
        console.log('working');
        this.setState({
          startHour: 7,
          endHour: 8
        });
      }
  }
  calendarOnChange = (dateSelected) => {
    if(moment().date() === moment(dateSelected).date()){
      this.setState({
        openTime: (this.state.startHour <= moment().hour()) ? moment(dateSelected).startOf('hour') : moment(dateSelected).startOf('hour').hour(this.state.startHour),
        closeTime: (this.state.endHour > moment().hour()) ? moment(dateSelected).startOf('hour').hour(this.state.endHour) : moment(dateSelected).startOf('hour').add(this.state.duration, 'hour'),
        startHour: moment().startOf('hour').hour(),
        endHour: (this.state.endHour > (moment().hour() + Math.ceil(this.state.duration))) ? this.state.endHour : moment().startOf('hour').add(Math.ceil(this.state.duration), 'hour').hour()
      });
    } else {
      this.setState({
        openTime: moment(dateSelected).hour(this.state.startHour),
        closeTime: moment(dateSelected).hour(this.state.endHour),
      });
    }
  };
  timesOnChange = (event) => {
    const target = event.target;
    const hoursToAdd = target.value;
    const startTime = this.state.openTime.clone().hour(hoursToAdd).startOf('hour');
    const hour = startTime.hours();
    this.setState({
      openTime: this.state.openTime.hour(target.value).startOf('hour'),
      startHour: hour,
      endHour:(this.state.endHour <= (hour + Math.ceil(this.state.duration))) ? hour + Math.ceil(this.state.duration) : this.state.endHour,
      closeTime: (this.state.closeTime.hour() <= (hour + Math.ceil(this.state.duration))) ? this.state.closeTime.hour(hour + Math.ceil(this.state.duration)) : this.state.closeTime
    });

    //console.log(this.state.openTime);
  };

  closeTimeOnChange = (event) => {
    const target = event.target;
    const hours = target.value;
    this.setState({
      closeTime: this.state.openTime.clone().hour(hours).startOf('hour'),
      endHour: hours,
    })
  };

  durationOnChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    console.log(value);
    console.log(moment().hour() + Math.ceil(value))
    this.setState({
      duration: value,
      closeTime: (this.state.closeTime.hour() <= (moment().hour() + Math.ceil(value))) ? this.state.closeTime.hour(this.state.openTime.hour() + Math.ceil(value)) : this.state.closeTime,
      endHour: moment().hour() + Math.ceil(value),
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
    //console.log(this.state.duration);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const amens = [];
    if(this.state.amensCoffee)
      amens.push('coffee');
    if(this.state.amensSofa)
      amens.push('sofa');
    if(this.state.amensPrinter)
      amens.push('printer');
    if(this.state.amensProjector)
      amens.push('projector');
    if(!this.props.search) {
      console.log("JUST CHECKING IF SEARCH PROP IS NOT SET")
      this.apply(event, this.state.duration, this.state.occupants);
    } else {
      console.log("CALLING APPLY!!!!!!!!!!")
      this.apply( this.state.openTime.toISOString(), this.state.closeTime.toISOString(), this.state.duration, this.state.locationIds, amens, this.state.occupants)
    }

  }

  showOpenTimeChoices() {
    const res = [];
    let fDHours = this.state.startHour;
    let fakeD = moment().hour(fDHours).startOf('hour');
    let realD = moment().hour(23);
    let defVal = this.state.startHour;
    if(!(this.state.openTime.date() === fakeD.date()) || (this.state.openTime.hour() !== fDHours)) {
      fakeD = moment().hour(7).startOf('hour');
      defVal = 7;
    }

    for(let a=0; !fakeD.isSame(realD) && fakeD.isBefore(realD); a++) {
      res.push(
        <option value={fakeD.hour()} name="sm" key={fakeD.hour()} onChange={this.timesOnChange} defaultValue={defVal}>{fakeD.format('h:mm A')}</option>
      )
      fakeD.add(1, 'hours');
    }

    return res;
  }
  showCloseTimeChoices() {
    const res = [];
    let fDHours =  this.state.startHour + Math.ceil(this.state.duration);
    //console.log(fDHours);
    let fakeD = moment().hour(fDHours).startOf('hour');
    let realD = moment().add(1, 'day').hour(0);
    let defVal = this.state.endHour + Math.ceil(this.state.duration);
    if(!(this.state.openTime.date() === fakeD.date()) || (this.state.closeTime.hour() !== fDHours)) {
      fakeD = moment().hour(8).add(Math.ceil(this.state.duration), 'hours').startOf('hour');
      defVal = 8;
    }
    if(this.state.startHour >= fakeD.hour()) {
      fakeD.hour(this.state.startHour).add(Math.ceil(this.state.duration), 'hour');
    }
    for(let a=0; (!fakeD.isSame(realD)) && fakeD.isBefore(realD); a++) {
      //console.log(fakeD.hour());
      res.push(
        <option value={fakeD.hour()} name="sm" key={fakeD.hour()} onChange={this.closeTimeOnChange} defaultValue={defVal}>{fakeD.format('h:mm A')}</option>
      )
      fakeD.add(1, 'hours');
      //console.log(fakeD);
    }

    return res;
  }

  jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

  prepareLocations = () => {
    const locations = this.state.locations;
    const wsq = [];
    const bkln = [];
    let wsqLocs = [];
    let bklnLocs = [];
    locations.forEach((loc) => {
      if(loc.campus === 'wsq') wsq.push(loc);
      else bkln.push(loc);
    });
    if(wsq.length !== 0) {
      wsqLocs = wsq.map((loc) => (
        <div key="div" className='checkB'>
          &nbsp; &nbsp;
          <input className="check" type='checkbox' value={loc.id}
            name={loc.id} checked={this.state.locationIds[loc]}
            onChange={this.handleChange} key={loc.id}
            />
            <label htmlFor={loc.id} className="label" key={loc.id + ' label'}>&nbsp;{loc.name} </label>
        </div>
      ));
    }
    if(bkln.length !== 0) {
      bklnLocs = bkln.map((loc) => (
        <div key="divv" className="checkB">
          &nbsp; &nbsp;
          <input className="check" type='checkbox' value={loc.id}
            name={loc.id} checked={this.state.locationsIds[loc]}
            onChange={this.handleChange} key={loc.id}
            />
            <label htmlFor={loc.id} className="label" key={loc.id + ' label'}>&nbsp;{loc.name}</label>
        </div>
      ));
    }
    return (
      {wsq: wsqLocs,
      bkln: bklnLocs}
    )
  }




  resetFilter() {
    const d = new Date();
    const x = Math.floor(Math.random() * Math.floor(100));
    this.state.locations.forEach((loc) => {
      this.setState({
        [loc.id]: false
      });
    }
  )
    this.setState({
      duration: 2,
      occupants: 1,
      openTime: d,
      amensCoffee: false,
      wrapper: x
    });
    console.log(this.state.wrapper);

  }


  render() {
    const manhattan = this.prepareLocations().wsq;
    const brooklyn = this.prepareLocations().bkln;

      return (
        <div className={this.state.isSearch ? "filterdv srchFilterDv normalCol" : "filterdv normalCol"} key={this.state.wrapper}>
          <Card bigTitle={'Filter'} clear={true} clrFilter={this.resetFilter.bind(this)} style={{}} isFltr={true}>

            <form onSubmit={this.handleSubmit}>
              <div className="line"></div>
              {this.props.search && (
                <Card title="Campus" className="filterbx" style={{'.title' : {fontSize: '20px'}}}>
                  <span className="title">Campus</span>
                  <br/>
                  <br/>
                  <Accordion title="Manhattan" style={{fontSize: '10px'}}>
                    {manhattan}
                  </Accordion>
                  <br/>
                  <Accordion title="Brooklyn">
                    {brooklyn}
                  </Accordion>
                </Card>
              )}

              <Card className={!this.state.isSearch ? "filterbx noBo" : "filterbx"}>
                <span className="title">Duration</span>
                <br/>
                <br/>
                <div className="ddcontainer lightMauve borderHack">
                  <FormGroup controlId="formControlsSelect" >
                   <FormControl componentClass="select" placeholder="select" defaultValue={2} name="duration" onChange={this.durationOnChange.bind(this)}>
                     <option className="op" value=".5" name=".5" >0.5 hours</option>
                     <option className="op" value="1" name="1" >1 hour</option>
                     <option className="op" value="1.5" name="1.5" >1.5 hours</option>
                     <option className="op" value="2" name="2" >2 hours</option>
                     <option className="op" value="2.5" name="2.5" >2.5 hours</option>
                     <option className="op" value="3" name="3" >3 hours</option>
                   </FormControl>
                 </FormGroup>
                </div>
                <br/>
              </Card>

            {this.state.isSearch &&  (
              <Card className="filterbx">
                <span className="title">Occupants</span>
                <br/>
                <br/>
                <div className="ddcontainer lightMauve borderHack">
                  <FormGroup controlId="formControlsSelect">
                   <FormControl componentClass="select" placeholder="select" defaultValue={1} name="occupants" onChange={this.handleChange}>
                     <option value="1" name="1" onChange={this.handleChange}>1 person</option>
                     <option value="2" name="2" onChange={this.handleChange}>2 people</option>
                     <option value="3" name="3" onChange={this.handleChange}>3 people</option>
                     <option value="4" name="4" onChange={this.handleChange}>4 people</option>
                     <option value="5" name="5" onChange={this.handleChange}>5 people</option>
                     <option value="6" name="6" onChange={this.handleChange}>6 people</option>
                     <option value="7" name="7" onChange={this.handleChange}>7 people</option>
                     <option value="8+" name="8+" onChange={this.handleChange}>8+ people</option>
                   </FormControl>
                 </FormGroup>
                  {/* <input type="range" min={1} max={3} name="duration" defaultValue={this.state.duration} className="slider" id="myRange"
                   onChange={this.handleChange} step={1}/> */}
                </div>
                <br/>
              </Card>
            )}

            {this.props.search &&  (
              <Card className="filterbx">
                <span className="title">Select Date</span>
                <br/>
                <br/>
                <div className="calendarContainer lightMauve borderHack">
                  <Calendar onChange={this.calendarOnChange}
                    value={this.state.openTime.toDate()}
                    defaultValue={this.state.openTime.toDate()}
                    maxDetail="month"
                    minDate={this.state.date}
                    maxDate={Date.today().add({days: 14})}
                  />
                </div>
                <br/>
              </Card>
            )}

            {( this.props.search &&

              <Card className="filterbx" >
                <span className="title" title="The start of the time range you would like to search for.">Show vacancies from </span>

                <br/>
                <br/>
                <div className="rangeSelectDv ">
                  <div className="ddcontainer timeRange lightMauve borderHack">
                    <FormGroup controlId="formControlsSelect" key={this.state.random}>
                     <FormControl componentClass="select"
                       placeholder="select"
                       defaultValue={dateFormat(this.state.openTime, "shortTime")}
                       name="occupants"
                       onChange={this.timesOnChange}
                       >
                       {this.showOpenTimeChoices()}
                     </FormControl>
                   </FormGroup>
                  </div>
                   <div>
                    <span >to</span>
                  </div>
                  <div className="ddcontainer timeRange lightMauve borderHack">
                    <FormGroup controlId="formControlsSelect">
                     <FormControl componentClass="select"
                       placeholder="select"
                       defaultValue={dateFormat(this.state.closeTime, "shortTime")}
                       name="occupants"
                       onChange={this.closeTimeOnChange}
                       >
                       {this.showCloseTimeChoices()}
                     </FormControl>
                   </FormGroup>
                  </div>
                </div>
                <br/>
              </Card>
            )}


            {( this.props.search &&
              <Card className="filterbx amenity " lastItem={true}>
                <Accordion title="Amenities" styles={{'Accordion__header': {fontSize: '15px', fontWeight: 'bold'},
                  'Accordion__header--collapsed': {fontSize: '15px', fontWeight: 'bold'}}}>
                  <br/>
                  <div>
                    <input className="check" type="checkbox"
                      name='amensCoffee' checked={this.state.amensCoffee}
                      onChange={this.handleChange}/> &nbsp; Coffee
                    <br/>
                    <br/>
                    <input className="check" type="checkbox"
                      name='amensPrinter' checked={this.state.amensPrinter}
                      onChange={this.handleChange}/>  &nbsp; Printer
                    <br/>
                    <br/>
                    <input className="check" type="checkbox"
                      name='amensProjector' checked={this.state.amensProjector}
                      onChange={this.handleChange}/>  &nbsp; Projector
                    <br/>
                    <br/>
                    <input className="check" type="checkbox"
                      name='amensSofa' checked={this.state.amensSofa}
                      onChange={this.handleChange}/>  &nbsp; Sofa
                  </div>
                </Accordion>
              </Card>
            )}
              <br/>
              <div className="applyDv">
                <button type="submit" className="apply gradient">Apply</button>
              </div>

              <br/>
              <br/>
              <br/>
            </form>
          </Card>
        </div>
      );
  }
}

export default Filter;
