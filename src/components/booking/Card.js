import React from 'react';

import './card.css';

class Card extends React.Component {

  constructor(props) {

    const d = new Date();

    super(props);
    this.title = props.title;
    this.bigTitle = false;
    this.state = {
      duration: 2,
      location: '',
      occupants: 1,
      date: d.toString(),
      startTime: ''
    }
  }

  render() {
    return (<div className="base">
      <div className="title bigTitle">
        {this.title}
      </div>
      {this.props.children}
    </div>)
  }
}

export default Card;
