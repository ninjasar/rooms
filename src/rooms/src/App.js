import React from 'react';
import { Link, } from 'react-router-dom';
import axios from 'axios';
import {  Navbar } from "react-bootstrap";
import PropTypes from 'prop-types';

import './index.css';
import AppName from './topBar/AppName.js';
import Banner from './Banner/Banner.js';
import RoomRec from './mainMenu/RoomRec.js';
import pic from './mainMenu/pic.jpeg';
//import Transparent from './Transparent.js';
import Login from './Login.js';
import Btn from './Btn.js';
import Rooms from './Rooms.js';
import Routes from "./Routes";
import BackButton from './BackButton.js';

class App extends React.Component {

  constructor(props) {

      super(props);
      this.state = {
      loggedIn: false,
      currentUser: '',

      }
    }





  render () {

      const url = 'https://virtserver.swaggerhub.com/nyustit/rooms/5.0/';

      const login = (response, userNm) => {
        console.log(response);
        this.setState({
          loggedIn: true
        });
        getUser(userNm);
      };

      const setUser = (name) => {
        this.setState({
          currentUser: name
        });
        this.forceUpdate();
        console.log(this.state.currentUser);
      };

      function getUser(userNm) {
        axios({
          method: 'get',
          url: url + 'users',
          data: {
            "user": userNm
          },
          headers: {
            'Accept': 'application/json'
          }
        }).then(function (response) {
          return setUser(response.data[0].name);
        }).catch(function (error) {
          console.log(error.response);
        });
      };
      var currentRoute = window.location.pathname;
      console.log(currentRoute);

      function loginFn(userNm, passWd) {
        axios({
          method: 'post',
          url: url + 'auth/login',
          data: {
            "username": userNm,
            "password": passWd
          },
          headers: {
            'Accept': 'application/json'
          }
        }).then(function (response) {
          return login(response, userNm);
        }).catch(function (error) {
          console.log(error.response);
        });
      };
    const btnCompnent = () => {
    return <Btn></Btn>
    }
    const rooms = () => {
      return <Rooms loggedIn={this.state.loggedIn} uName= {this.state.currentUser} login={loginFn} />
    }
    return (
      <div id="homeLayout">
        <Navbar className="topBar">
          <div className="flexy">
            <Link to="/button/" className="navLink">
              <AppName uName={this.state.currentUser} loggedIn={this.state.loggedIn} url={currentRoute}/>
            </Link>
          </div>
        </Navbar>
        <div>
          <Routes roomscmp={rooms} btncmp={btnCompnent}/>
      </div>

      </div>

    )
  }
}
export default App;
