import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Accordion from 'react-collapsy';


import Card from './Card.js';
import '../../../node_modules/react-collapsy/lib/index.css';
import './card.css';



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
        kimmel: false,
        bobst: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }
  handleSubmit = (event) => {
    this.props.apply();
    event.preventDefault();
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
                  <input type='checkbox' value="Bobst"
                    name="bobst" checked={this.state.bobst}
                    onChange={this.handleChange}
                    />
                  <label htmlFor="Bobst" className="label">&nbsp;Bobst</label>
                  <br/>
                  <br/>
                  <input type="checkbox" value="Kimmel"
                    name="kimmel" checked={this.state.kimmel}
                    onChange={this.handleChange}/>
                  <label htmlFor="Kimmel" className="label">&nbsp;Kimmel</label>
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
                <div className="slidecontainer">
                  <input type="range" min={1} max={3} name="duration" defaultValue={this.state.duration} className="slider" id="myRange"
                   onChange={this.handleChange} step={1}/>
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
