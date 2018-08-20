import React from 'react';
import { DropdownButton, MenuItem, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Calendar from 'react-calendar';
import Accordion from 'react-collapsy';

import API from '../../utils';
import Card from './Card.js';
import '../../../node_modules/react-collapsy/lib/index.css';
import './filter.css';



function log(value) {
  //console.log(value); //eslint-disable-line
}





class Filter extends Card {

  constructor(props) {
    super(props);

    const d = new Date();

      this.state = {
        duration: 2,
        locations: [],
        locationIds: [],
        occupants: 1,
        date: d,
        openTime: '',
        closeTime: '',
        isSearch: this.props.search || false,
        amensCoffee: false,
        amensPrinter: false,
        amensProjector: false,
        amensSofa: false,

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.apply = this.props.apply;
      this.reserve = this.props.reserve;
      this.wrapper = 'old';
    }

  componentDidMount() {
    API.getLocs()
      .then((results) => {
        this.setState({
          locationIds: results.idArray,
          locations: results.data
        });
        //console.log(this.state.locationIds);
        if(this.state.locationIds) {
          this.state.locationIds.forEach((loc) => {
            this.setState({
              loc: false,
            });
            //console.log(this.state.loc);
            //console.log(loc);
          });
        }
        if(this.props.homePg) {
          this.setState({
            occupants: 1,
          });
        }
        //console.log(this.state.BOBST)
      }).catch((error) =>  {
      this.setState({
          eMessage: error,
        });
        console.log(error);
      });
  }
  calendarOnChange = date => this.setState({ date });
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
    //console.log(this.state.occupants);
  }
  handleSubmit = (event) => {
    const amens = [this.state.amensCoffee, this.state.amensSofa, this.state.amensPrinter, this.state.amensProjector];
    event.preventDefault();
    if(!this.props.search) {
      this.apply(event, this.state.duration, this.state.occupants);
    } else {
      console.log('calling srch apply');
      this.apply( this.state.openTime, this.state.closeTime, this.state.duration, this.state.locationIds, amens, this.state.occupants)
    }

  }

  jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

  prepareLocations = () => {
    const locations = this.state.locations;
    const wsq = [];
    const bkln = [];
    locations.forEach((loc) => {
      if(loc.campus === 'wsq') wsq.push(loc);
      else bkln.push(loc);
    });
    //console.log(wsq);
    const wsqLocs = wsq.map((loc) => (
      <div key="divv">
        &nbsp; &nbsp;
        <input className="check" type='checkbox' value={loc.id}
          name={loc.id} checked={this.state.locationIds[loc]}
          onChange={this.handleChange} key={loc.id}
          />
        <label htmlFor={loc.id} className="label" key={loc.id + ' label'}>&nbsp;{loc.name}</label>
      </div>
    ));
    // const bklnLocs = bkln.map((loc) => (
    //   <div key="divv">
    //     &nbsp; &nbsp;
    //     <input className="check" type='checkbox' value={loc.id}
    //       name={loc.id} checked={this.state.locationsIds[loc]}
    //       onChange={this.handleChange} key={loc.id}
    //       />
    //     <label htmlFor={loc.id} className="label" key={loc.id + ' label'}>&nbsp;{loc.name}</label>
    //   </div>
    // ));

    return (
      {wsq: wsqLocs}
    )

  }

  resetFilter() {
    const d = new Date();
    this.wrapper = 'new';
    this.state.locations.forEach((loc) => {
      this.setState({
        [loc.id]: false
      });
    }
  )
    this.setState({
      duration: 2,
      occupants: 1,
      date: d.toString(),
    });
  }


  render() {
    const manhattan = this.prepareLocations().wsq;
    const brooklyn = this.prepareLocations().bkln;
    //console.log(this.state.isSearch);

      return (
        <div className={this.state.isSearch ? "filterdv srchFilterDv" : "filterdv"} key={this.wrapper}>
          <Card bigTitle={true} clear={true} clrFilter={this.resetFilter.bind(this)} style={{}} isFltr={true}>
              <div>
                <span className="bigTitle">Filter</span>
                  <span className="clear">
                  <button onClick={this.props.clrFilter}>
                    Clear
                  </button>
                </span>
              </div>
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
                <div className="ddcontainer">
                  <FormGroup controlId="formControlsSelect" >
                   <FormControl componentClass="select" placeholder="select" defaultValue={2} name="duration" onChange={this.handleChange}>
                     <option className="op" value=".5" name=".5" onChange={this.handleChange}>0.5 hours</option>
                     <option className="op" value="1" name="1" onChange={this.handleChange}>1 hour</option>
                     <option className="op" value="1.5" name="1.5" onChange={this.handleChange}>1.5 hours</option>
                     <option className="op" value="2" name="2" onChange={this.handleChange}>2 hours</option>
                     <option className="op" value="2.5" name="2.5" onChange={this.handleChange}>2.5 hours</option>
                     <option className="op" value="3" name="3" onChange={this.handleChange}>3 hours</option>
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
                <div className="ddcontainer">
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
                <div className="calendarContainer">
                  <Calendar onChange={this.calendarOnChange}
                    value={this.state.date}
                  />
                </div>
                <br/>
              </Card>
            )}

            {( this.props.search &&
              <Card className="filterbx">
                <span className="title" title="The start of the time range you would like to search for.">Show me rooms available between</span>
                <br/>
                <br/>
                <div className="rangeSelectDv">
                  <div className="ddcontainer timeRange">
                    <FormGroup controlId="formControlsSelect">
                     <FormControl componentClass="select" placeholder="select" defaultValue={1} name="occupants" onChange={this.handleChange}>
                       <option value="06:00" name="1" onChange={this.handleChange}>6am</option>
                       <option value="07:00" name="1" onChange={this.handleChange}>7am</option>
                       <option value="08:00" name="1" onChange={this.handleChange}>8am</option>
                       <option value="09:00" name="1" onChange={this.handleChange}>9am</option>
                       <option value="10:00" name="1" onChange={this.handleChange}>10am</option>
                       <option value="11:00" name="1" onChange={this.handleChange}>11am</option>
                       <option value="12:00" name="1" onChange={this.handleChange}>12pm</option>
                       <option value="13:00" name="1" onChange={this.handleChange}>1pm</option>
                       <option value="14:00" name="2" onChange={this.handleChange}>2pm </option>
                       <option value="15:00" name="3" onChange={this.handleChange}>3pm </option>
                       <option value="16:00" name="4" onChange={this.handleChange}>4pm </option>
                       <option value="17:00" name="5" onChange={this.handleChange}>5pm </option>
                       <option value="18:00" name="6" onChange={this.handleChange}>6pm </option>
                       <option value="19:00" name="7" onChange={this.handleChange}>7pm </option>
                       <option value="20:00" name="8+" onChange={this.handleChange}>8pm </option>
                       <option value="21:00" name="1" onChange={this.handleChange}>9pm</option>
                       <option value="22:00" name="1" onChange={this.handleChange}>10pm</option>
                       <option value="23:00" name="1" onChange={this.handleChange}>11pm</option>
                     </FormControl>
                   </FormGroup>
                  </div>
                  <div>
                    <span >and</span>
                  </div>
                  <div className="ddcontainer timeRange" title="The end of the time range you would like to search for.">
                    <FormGroup controlId="formControlsSelect">
                     <FormControl componentClass="select" placeholder="select" defaultValue={1} name="occupants" onChange={this.handleChange}>
                       <option value="06:00" name="1" onChange={this.handleChange}>6am</option>
                       <option value="07:00" name="1" onChange={this.handleChange}>7am</option>
                       <option value="08:00" name="1" onChange={this.handleChange}>8am</option>
                       <option value="09:00" name="1" onChange={this.handleChange}>9am</option>
                       <option value="10:00" name="1" onChange={this.handleChange}>10am</option>
                       <option value="11:00" name="1" onChange={this.handleChange}>11am</option>
                       <option value="12:00" name="1" onChange={this.handleChange}>12pm</option>
                       <option value="13:00" name="1" onChange={this.handleChange}>1pm</option>
                       <option value="14:00" name="2" onChange={this.handleChange}>2pm </option>
                       <option value="15:00" name="3" onChange={this.handleChange}>3pm </option>
                       <option value="16:00" name="4" onChange={this.handleChange}>4pm </option>
                       <option value="17:00" name="5" onChange={this.handleChange}>5pm </option>
                       <option value="18:00" name="6" onChange={this.handleChange}>6pm </option>
                       <option value="19:00" name="7" onChange={this.handleChange}>7pm </option>
                       <option value="20:00" name="8+" onChange={this.handleChange}>8pm </option>
                       <option value="21:00" name="1" onChange={this.handleChange}>9pm</option>
                       <option value="22:00" name="1" onChange={this.handleChange}>10pm</option>
                       <option value="23:00" name="1" onChange={this.handleChange}>11pm</option>
                     </FormControl>
                   </FormGroup>
                  </div>
                </div>
                <br/>
              </Card>
            )}


            {( this.props.search &&
              <Card className="filterbx amenity" lastItem={true}>
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
                <button type="submit" className="apply">Apply</button>
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
