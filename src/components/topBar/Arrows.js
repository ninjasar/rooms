import React from 'react';


import './topBar.css';
import down from './down.svg';
import up from './upIcon.svg';





class Arrows extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key : 'j'
    };
  }
  dir = down;
  switchArrows = () => {
    if(this.dir === down) {
      this.dir = up;
      this.setState({
        key: 'm'
      });
    }else {
      this.dir = down;
      this.setState({
        key: 'b'
      });
    }
  }

  render() {
    return (
     <div className="arrowContainer" key={this.state.key} onClick={() => {this.switchArrows()}}>
         <img src={this.dir} alt="arrow" className="arrow"/>
     </div>
   );
  }

};

export default Arrows;
