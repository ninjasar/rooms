import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

import "./App.css";
import './index.css';
import AppName from './components/topBar/AppName.js';
import Banner from './components/Banner/Banner.js';
import RoomRec from './components/mainMenu/RoomRec.js';
import pic from './components/mainMenu/pic.jpeg';
import SearchPg from "./containers/SearchPg";
import Btn from './containers/Btn.js';
import HomePg from './containers/HomePg.js';
import Routes from "./Routes";
import LoginForm from './containers/LoginForm.js';

class App extends React.Component {

  constructor(props) {

      super(props);
      this.state = {
      loggedIn: false,
      currentUser: '',

      }
    }





  render () {

      const url = 'https://virtserver.swaggerhub.com/nyustit/rooms-api/7.0/';

      const login = (response, userNm) => {
        console.log(response);
        this.setState({
          loggedIn: true
        });
        getUser(userNm);
        console.log(this.state.loggedIn);
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
    const homePg = () => {
      return <HomePg loggedIn={this.state.loggedIn} uName= {this.state.currentUser} login={loginFn} />
    }
    const logFrm = () => {
      return <LoginForm loginClicked={loginFn} />
    }
    console.log(this.state.loggedIn);

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
          <Routes loggedIn={this.state.loggedIn} homecmp={homePg} btncmp={btnCompnent} logcmp={logFrm} />
        </div>
      </div>
    )
  };
}


export default App;
