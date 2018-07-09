import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Accordion from 'react-collapsy';
import {ReactBootstrapSlider} from 'react-bootstrap-slider';


import Card from './Card.js';

import './card.css';

require('../../../node_modules/react-collapsy/lib/index.css');

function log(value) {
  console.log(value); //eslint-disable-line
}





class Filter extends Card {

  constructor(props) {

    const d = new Date();

      super(props);
      this.state = {
        duration: 2,
        location: '',
        occupants: 1,
        date: d.toString(),
        isSearch: false,
        value: 2,
      };
    }
    handleChange = (event) => {
      this.setState({value: event.target.value});
    }

  render() {
      return (
        <div id="filterdv">
          <Card bigTitle={true} title="Filter" style={{borderBottom: 'none'}}>
            <form onSubmit={this.handleSubmit}>
              <div className="line"></div>
              <Card title="Campus" className="filterbx">

                <Accordion title="Manhattan">
                  <input type="checkbox" value="Bobst"/>
                  <label htmlFor="Bobst" className="label">&nbsp;Bobst</label>
                  <br/>
                  <br/>
                  <input type="checkbox" value="Kimmel"/>
                  <label htmlFor="Kimmel" className="label">&nbsp;Kimmel</label>
                </Accordion>

                <Accordion title="Brooklyn">
                  <input type="checkbox" value="Bobst"/>
                  <label htmlFor="Bobst" className="label">&nbsp;Bobst</label>
                  <br/>
                  <br/>
                  <input type="checkbox" value="Kimmel"/>
                  <label htmlFor="Kimmel" className="label">&nbsp;Kimmel</label>
                </Accordion>
              </Card>
              <Card title="Duration" className="filterbx">
                <br/>
                <div class="slidecontainer">
                  <input type="range" min={1} max={3} defaultValue={this.state.value} class="slider" id="myRange"
                   onChange={this.handleChange} step={1}/>
                   <br/>
                  {this.state.value} hours
                </div>
                <br/>
              </Card>
              <Card title="Amenities" className="filterbx" amenity={true}>
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
                <br/>
                <br/>
                <br/>
                <span className="apply">Apply</span>
              </Card>
            </form>
          </Card>
        </div>
      );
  }
}

export default Filter;
