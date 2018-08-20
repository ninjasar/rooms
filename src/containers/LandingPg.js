import React from 'react';
import {NavLink} from 'react-router-dom';

import './landing.css';



class LandingPg extends React.Component {

  constructor(props) {

    super(props);

    this.loginClicked = this.props.loginClicked

}



    render() {

      return (
        <div id="landingPg" >
          <div className="joinTxt">
          nyu rooms
          <br/>
          </div>
          <div className="description">
            "get a room!"
          </div>
          <div className="btnCnt">
            <NavLink to="/login/">
              <button className="choiceBtn" >
                log in
              </button>
            </NavLink>

            <div className="or">or</div>
            <div>
              <button className="choiceBtn" onClick={() => {this.loginClicked("rmr478", "password")}} >
                join now
              </button>
            </div>
          </div>
        </div>

      )
    }
}

export default LandingPg;
