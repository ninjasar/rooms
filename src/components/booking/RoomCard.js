import React from 'react';

import Card from './Card.js';
import './card.css';

class RoomCard extends Card {

  constructor(props) {

    const d = new Date();

    super(props);

    this.amenity = false;
    this.isRoomRec = true;
    this.title.className = 'recTitle';
    this.bigTitle.className = 'recTitle';
    this.state = {
      duration: 2,
      location: '',
      occupants: 1,
      date: d.toString(),
      startTime: '',
    };
  }

  render() {

    if (this.props.bigTitle === true) {
      this.bigTitle = true;
    }


    return (
      <div className={'base ' + (this.lastItem && ' lastItem ' ) + ' ' + (this.isRoomRec && ' roomRec' )+ ' ' + (this.srchBtn && ' advancedSearchCard' )} onClick={this.props.onClick}>
        <div>
          {this.props.img && <img src={this.props.img} className="recImg"/>}
        </div>
        <div className={(this.props.title && ' title ') + ' ' + (this.bigTitle && ' bigTitle' )}>
            {this.props.title && this.title}
          {this.bigTitle && this.props.clear &&
            <span className="clear">
            <button onClick={this.props.clrFilter}>
              Clear
            </button>
          </span>}
        </div>


        <div style={{ marginLeft: '0px'}} className='child '>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default RoomCard;
