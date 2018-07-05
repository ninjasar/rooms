import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import Card from '../booking/Card.js';
import './card.css';


class Filter extends Card {

  constructor(props) {

    const d = new Date();

      super(props);
      this.state = {
        duration: 2,
        location: '',
        occupants: 1,
        date: d.toString(),
      };
    }

  render() {
      return (
        <div id="filterdv">
          <Card bigTitle={true} title="Filter" >
            <div className="line">jksljfljd</div>
            <Card title="location" className="filterbx">
              here is some text~
            </Card>
            <Card title="duration" className="filterbx">
              jfdlksjfdlsj
            </Card>
            <Card title="date" className="filterbx">
              {this.state.date}
            </Card>
          </Card>
        </div>
      );
  }
}

export default Filter;
