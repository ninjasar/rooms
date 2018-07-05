import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

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
      }
    }

  render() {
      return (
        <Card title="Filter" className="filterbx">
          <div className="">jksljfljd</div>
          <div>{this.state.date}</div>
        </Card>
      )
  }
}

export default Filter;
