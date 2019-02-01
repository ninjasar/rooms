import React from 'react';
import {NavLink} from 'react-router-dom';
import Media from 'react-media';

import Card from '../components/booking/Card.js';
import Logo from '../components/topBar/Logo.js';
import LandingImg from './LandingImg.js';
import './landing.css';
import '../god.css';



class LandingPg extends React.Component {

  constructor(props) {

    super(props);

    this.loginClicked = this.props.loginClicked

}



    render() {

      return (
        <Media query="(max-width: 1200px)">
        {matches =>
          matches ? (
            <div id="landingPg" >

                <div className='landMainC'>
                  <div className='introTxt'>
                    <div className='logoTitle'>
                      <div className='logoC'>
                      <Logo></Logo>
                      </div>
                      NYU <br/>
                      ROOMS
                    </div>
                    <div className="catchphrase">
                      "get a room!"
                    </div>

                      <p className='description'>
                        NYU Rooms is a cross-platform room reservation website for NYU. We integrated separate buildings' reservation systems into one cohesive platform to make NYU rooms your
                        one-stop-shop for all your reservation needs.
                        Our search feature services buildings such as Elmer Holmes Bobst Library,
                        Bern Dibner Library, NYU Skirball centre, and many others, so you'll never have to stress again about finding a place to study.
                        NYU Rooms allows students and staff to fill vacant rooms all over campus, up to 7 at a time!
                        For those who like to plan ahead, you may reserve rooms as early as 14 days in advance.
                      </p>

                  </div>
                  <div>
                  <LandingImg></LandingImg>
                  </div>
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
          ):(
            <div id="landingPg" >



                <div className='landMainC'>
                  <div className='introTxt'>
                    <div className='logoTitle'>
                      <div className='logoC'>
                      <Logo></Logo>
                      </div>
                      NYU <br/>
                      ROOMS
                    </div>
                    <div className="catchphrase">
                      "get a room!"
                    </div>

                      <p className='description'>
                        NYU Rooms is a cross-platform room reservation website for NYU. We integrated separate buildings' reservation systems into one cohesive platform to make NYU rooms your
                        one-stop-shop for all your reservation needs.
                        Our search feature services buildings such as Elmer Holmes Bobst Library,
                        Bern Dibner Library, NYU Skirball centre, and many others, so you'll never have to stress again about finding a place to study.
                        NYU Rooms allows students and staff to fill vacant rooms all over campus, up to 7 at a time!
                        For those who like to plan ahead, you may reserve rooms as early as 14 days in advance.
                      </p>

                  </div>
                  <div>
                  <LandingImg></LandingImg>
                  </div>
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
          )}
      </Media>

      )
    }
}

export default LandingPg;
