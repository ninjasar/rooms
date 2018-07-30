import React from 'react';
import { DropdownButton, MenuItem, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Calendar from 'react-calendar';
import Accordion from 'react-collapsy';

import API from '../../utils';
import Card from './Card.js';
import '../../../node_modules/react-collapsy/lib/index.css';
import './card.css';



function log(value) {
  console.log(value); //eslint-disable-line
}





class Filter extends Card {

  constructor(props) {
    super(props);

    const d = new Date();

      this.state = {
        duration: 2,
        locations: [],
        occupants: 1,
        date: d,
        isSearch: false,
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
          locations: results.idArray
        });
        if(this.state.locations) {
          this.state.locations.forEach((loc) => {
            this.setState({
              [loc]: false,
            });
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
    this.apply(event, this.state.duration, this.state.occupants);
    event.preventDefault();
  }

  jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

  renderLocations = () => {
    return (
      this.state.locations.map((id) => (
        <div key="divv">
          &nbsp; &nbsp;
          <input type='checkbox' value={id}
            name={id} checked={this.state.id}
            onChange={this.handleChange} key={id}
            />
          <label htmlFor={id} className="label" key={id + ' label'}>&nbsp;{this.jsUcfirst(id)}</label>
        </div>
        )
      )
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
    //console.log(this.state.bobst);
      return (
        <div id="filterdv" key={this.wrapper}>
          <Card bigTitle={true} title="Filter" clear={true} clrFilter={this.resetFilter.bind(this)} style={{}}>
            <form onSubmit={this.handleSubmit}>
              <div className="line"></div>
              {this.props.search && (
                <Card title="Campus" className="filterbx" style={{'.title' : {fontSize: '20px'}}}>
                  <br/>
                  <Accordion title="Manhattan" style={{fontSize: '10px'}}>
                    {/* <input type='checkbox' value="Bobst"
                      name="bobst" checked={this.state.bobst}
                      onChange={this.handleChange}
                      />
                    <label htmlFor="Bobst" className="label">&nbsp;Bobst</label>
                    <br/>
                    <br/>
                    <input type="checkbox" value="Kimmel"
                      name="kimmel" checked={this.state.kimmel}
                      onChange={this.handleChange}/>
                    <label htmlFor="Kimmel" className="label">&nbsp;Kimmel</label> */}
                    {this.renderLocations()}
                  </Accordion>
                  <br/>
                  <Accordion title="Brooklyn">
                    {this.renderLocations()}
                  </Accordion>
                </Card>
              )}

              <Card title="Duration" className="filterbx">
                <br/>
                <div className="ddcontainer">
                  <FormGroup controlId="formControlsSelect">
                   <FormControl componentClass="select" placeholder="select" defaultValue={2} name="duration" onChange={this.handleChange}>
                     <option value=".5" name=".5" onChange={this.handleChange}>0.5 hours</option>
                     <option value="1" name="1" onChange={this.handleChange}>1 hour</option>
                     <option value="1.5" name="1.5" onChange={this.handleChange}>1.5 hours</option>
                     <option value="2" name="2" onChange={this.handleChange}>2 hours</option>
                     <option value="2.5" name="2.5" onChange={this.handleChange}>2.5 hours</option>
                     <option value="3" name="3" onChange={this.handleChange}>3 hours</option>
                   </FormControl>
                 </FormGroup>
                  {/* <input type="range" min={1} max={3} name="duration" defaultValue={this.state.duration} className="slider" id="myRange"
                   onChange={this.handleChange} step={1}/> */}
                </div>
                <br/>
              </Card>

            {this.props.search &&  (
              <Card title="Occupants" className="filterbx">
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
              <Card title="Start time" className="filterbx">
                <br/>
                <div className="ddcontainer">
                  <Calendar onChange={this.calendarOnChange}
                    value={this.state.date}
                  />
                </div>
                <br/>
              </Card>
            )}



              <Card className="filterbx" lastItem={true} styles={{fontSize: '15px'}}>
                <Accordion title='Amenities' styles={{fontSize: '15px'}}>
                  <br/>
                  <div>
                    <input type="checkbox"
                      name='amensCoffee' checked={this.state.amensCoffee}
                      onChange={this.handleChange}/> &nbsp; Coffee
                    <br/>
                    <br/>
                    <input type="checkbox"
                      name='amensPrinter' checked={this.state.amensPrinter}
                      onChange={this.handleChange}/>  &nbsp; Printer
                    <br/>
                    <br/>
                    <input type="checkbox"
                      name='amensProjector' checked={this.state.amensProjector}
                      onChange={this.handleChange}/>  &nbsp; Projector
                    <br/>
                    <br/>
                    <input type="checkbox"
                      name='amensSofa' checked={this.state.amensSofa}
                      onChange={this.handleChange}/>  &nbsp; Sofa
                  </div>
                </Accordion>
              </Card>
              <br/>
              <button type="submit" className="apply">Apply</button>
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
