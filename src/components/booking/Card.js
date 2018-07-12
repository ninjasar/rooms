import React from 'react';

import './card.css';

class Card extends React.Component {

  constructor(props) {

    const d = new Date();

    super(props);
    this.title = props.title;
    this.amenity = false;
    this.bigTitle = false;
    this.state = {
      duration: 2,
      location: '',
      occupants: 1,
      date: d.toString(),
      startTime: '',
    };
  }

  render() {

    if (this.props.bigTitle == true) {
      this.bigTitle = true;
    }
    if (this.props.lastItem == true) {
      this.lastItem = true;
    }

    return (
      <div className={'base ' + (this.lastItem && ' lastItem' )}>
        <div className={'title ' + (this.bigTitle && ' bigTitle' )}>
            {this.title}
          {this.bigTitle && this.props.clear &&
            <span className="clear">
            <button>
              Clear
            </button>
          </span>}
        </div>


        <div style={{width: '90%'}} className='child '>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Card;
