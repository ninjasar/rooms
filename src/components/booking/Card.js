import React from 'react';

import './card.css';

class Card extends React.Component {

  constructor(props) {

    const d = new Date();

    super(props);
    this.title = props.title;
    this.amenity = false;
    this.bigTitle = false;
    this.isRoomRec = false;
    this.srchBtn = false;
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
    if (this.props.lastItem === true) {
      this.lastItem = true;
    }
    if (this.props.isRoomRec === true) {
      this.isRoomRec = true;
    }
    if (this.props.srchBtn === true) {
      this.srchBtn = true;
    }

    return (
      <div className={'base ' + (this.lastItem && ' lastItem ' ) + ' ' + (this.isRoomRec && ' roomRec' )+ ' ' + (this.srchBtn && ' advancedSearchCard' )} onClick={this.props.onClick}>
        <div className={(this.props.title && ' title ') + (this.bigTitle && ' bigTitle' )}>
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


export default Card;
