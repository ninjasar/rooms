import React from 'react';
import { Link } from 'react-router-dom';

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

    return (
      <div className="oval gradient" onClick={this.toggle}>
        <div className={this.state.hidden ? "hidedd" : "dropdown"}>
          <div id="myDropdown" className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </div>
    );
  }

}

export default Dropdown;
