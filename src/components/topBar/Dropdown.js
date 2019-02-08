import React from 'react';
import { Link } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

import Arrows from './Arrows.js';
import "./dropdown.css";
import '../../god.css';




class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      overlayH: '0%',
    }
    //this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    //this.open = this.open.bind(this);
  }



  toggle() {
    this.setState({
      hidden: !this.state.hidden,
      overlayH: '100%'
    });
  }

  close(event) {

    if (!event.target.matches('.dropbtn') && !event.target.matches('.oval') ) {
      this.setState({
        hidden: true
      });
    }
  }

  // open(event) {
  //
  //   if (!event.target.matches('.dropbtn') && !event.target.matches('.oval') && !event.target.matches('Arrows')) {
  //     this.setState({
  //       hidden: false
  //     });
  //   }
  // }




  render() {

    // else if(this.state.hidden == true){
    //   window.addEventListener('click', this.open);
    // }
    if(this.props.mobile){
      return(

        <Arrows className="nunya" onClick={this.toggle.bind(this)}>
        {console.log(this.state.hidden)}
            <div id="mynav" className={this.state.hidden ? "hidedd" : "overlay"} style={{height: this.state.overlayH}}>
                  <div className="overlay-content">
                    <Link className='overlaylink' to={this.props.link1Href}>{this.props.link1}</Link>
                    <Link className='overlaylink'to={this.props.link2Href}>{this.props.link2}</Link>
                    <Link className='overlaylink' to={this.props.link3Href}>{this.props.link3}</Link>
                  </div>
            </div>
        </Arrows>
      )
    }else {
      if(this.state.hidden == false){
        window.addEventListener('click', this.close);
      }
      return (
        <div className="oval gradient" onClick={this.toggle.bind(this)}>
          <div className={this.state.hidden ? "hidedd" : "dropdown"}>
            <div id="myDropdown" className="dropdown-content">
              <Link to={this.props.link3Href}>{this.props.link3}</Link>
            </div>
          </div>
        </div>
      );
    }

  }

}

export default Dropdown;
