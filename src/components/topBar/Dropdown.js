import React from 'react';
import { Link } from 'react-router-dom';

import Arrows from './Arrows.js';
import "./dropdown.css";
import '../../god.css';




class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
    }
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }



  toggle() {
    console.log('yooooo');
    console.log(this.props.mobile);
    this.setState({
      hidden: !this.state.hidden
    });
  }

  close(event) {

    if (!event.target.matches('.dropbtn') && !event.target.matches('.oval')) {
      this.setState({
        hidden: true
      });
    }
  }




  render() {
    if(this.state.hidden == false){
      window.addEventListener('click', this.close);
    }
    if(this.props.mobile) {
      return(
        <Arrows onClick={this.toggle}>
          <div className={this.state.hidden ? "hidedd" : "dropdown"}>
            <div id="myDropdown" className="dropdown-content">
              <Link to={this.props.link1Href}>{this.props.link1}</Link>
              <Link to={this.props.link2Href}>{this.props.link2}</Link>
              <Link to={this.props.link3Href}>{this.props.link3}</Link>
            </div>
          </div>
        </Arrows>
      )
    }else {
      return (
        <div className="oval gradient" onClick={this.toggle}>
          <div className={this.state.hidden ? "hidedd" : "dropdown"}>
            <div id="myDropdown" className="dropdown-content">
              <Link to={this.props.link1Href}>{this.props.link1}</Link>
              <Link to={this.props.link2Href}>{this.props.link2}</Link>
              <Link to={this.props.link3Href}>{this.props.link3}</Link>
            </div>
          </div>
        </div>
      );
    }

  }

}

export default Dropdown;
