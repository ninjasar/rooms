import React from 'react';

import './card.css';
import '../../god.css';

class Card extends React.Component {

  constructor(props) {


    super(props);
    this.title = props.title;
    this.amenity = false;
    this.bigTitle = false;
    this.isRoomRec = false;
    this.srchBtn = false;
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
      <div className={'base ' + (this.lastItem && ' lastItem ' ) + ' ' + (this.isRoomRec && ' roomRec' )+ ' ' + (this.props.className)} onClick={this.props.onClick}>
        <div className={this.props.bigTitle ? 'title2 tGradient' : ' '}>{this.props.bigTitle}
        {this.props.clear ? (
          <span className="clear">
            <button onClick={this.props.clrFilter}>
              Clear
            </button>
          </span>) : ''
      }</div>
        <div>
          {/* {this.props.img && <img src={this.props.img} className="recImg"/>} */}
        </div>



        <div style={{ marginLeft: '0px'}} className='child '>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default Card;
