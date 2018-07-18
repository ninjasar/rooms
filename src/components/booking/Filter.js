import React from 'react';
import { DropdownButton, MenuItem, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
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
        date: d.toString(),
        isSearch: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(this.state.BOBST)
      }).catch((error) =>  {
      this.setState({
          eMessage: error,
        });
        console.log(error);
      });
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
    console.log(this.state.duration);
  }
  handleSubmit = (event) => {
    this.props.apply();
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


  render() {
    //console.log(this.state.bobst);
      return (
        <div id="filterdv">
          <Card bigTitle={true} title="Filter" clear={true} style={{}}>
            <form onSubmit={this.handleSubmit}>
              <div className="line"></div>
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
                  <input type="checkbox" value="Bobst"
                    name="bobst" checked={this.state.bobst}
                    onChange={this.handleChange}/>
                  <label htmlFor="Bobst" className="label">&nbsp;Bobst</label>
                  <br/>
                  <br/>
                  <input type="checkbox" value="Kimmel"
                    name="kimmel" checked={this.state.kimmel}
                    onChange={this.handleChange}/>
                  <label htmlFor="Kimmel" className="label">&nbsp;Kimmel</label>
                </Accordion>
              </Card>
              <Card title="Duration" className="filterbx">
                <br/>
                <div className="ddcontainer">
                  <FormGroup controlId="formControlsSelect">
                   <FormControl componentClass="select" placeholder="select" defaultValue={2}>
                     <option value=".5">0.5 hours</option>
                     <option value="1">1 hour</option>
                     <option value="1.5">1.5 hours</option>
                     <option value="2">2 hours</option>
                     <option value="2.5">2.5 hours</option>
                     <option value="3">3 hours</option>
                   </FormControl>
                 </FormGroup>
                  {/* <input type="range" min={1} max={3} name="duration" defaultValue={this.state.duration} className="slider" id="myRange"
                   onChange={this.handleChange} step={1}/> */}
                   <br/>
                  {this.state.duration} hours
                </div>
                <br/>
              </Card>

              <Card className="filterbx" lastItem={true} styles={{fontSize: '15px'}}>
                <Accordion title='Amenities' styles={{fontSize: '15px'}}>
                <br/>
                <input type="checkbox"/> &nbsp; Coffee
                <br/>
                <br/>
                <input type="checkbox"/>  &nbsp; Printer
                <br/>
                <br/>
                <input type="checkbox"/>  &nbsp; Projector
                <br/>
                <br/>
                <input type="checkbox"/>  &nbsp; Sofa
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
