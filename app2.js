import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

import './App.css';
import './index.css';
import api from './utils';
import AppName from './components/topBar/AppName.js';
import Banner from './components/Banner/Banner.js';
import RoomRec from './components/mainMenu/RoomRec.js';
import pic from './components/mainMenu/pic.jpeg';
import SearchPg from './containers/SearchPg';
import Btn from './containers/Btn.js';
import HomePg from './containers/HomePg.js';
import Routes from './Routes';
import LoginForm from './containers/LoginForm.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser: '',
      eMessage: '',
    };
  }

  render() {
    const currentRoute = window.location.pathname;

    function setLoginState(name) {
      this.setState({
        loggedIn: true,
        currentUser: name,
        eMessage: '',
      });
    }

    function loginFn(userNm, passWd) {
      // make login api req
      api.loginUser(userNm, passWd).then((name) => {
        // set login state and set name
        setLoginState(name);
        // redirect to hompage
      }).catch((error) => {
        // if failed display invalid login
        console.log(error);
        this.setState({ eMessage: error });
      });
    }

    const btnCompnent = () => <Btn />;
    const homePg = () => <HomePg loggedIn={this.state.loggedIn} uName={this.state.currentUser} login={loginFn} />;
    const logFrm = () => <LoginForm loginClicked={loginFn} />;
    // console.log(this.state.loggedIn);

    return (
      <div id="homeLayout">
        <Navbar className="topBar">
          <div className="flexy">
            <Link to="/button/" className="navLink">
              <AppName uName={this.state.currentUser} loggedIn={this.state.loggedIn} url={currentRoute} />
            </Link>
          </div>
        </Navbar>
        <div className="rts">
          {
          this.state.eMessage && (
          <div className="error">
            {this.state.eMessage}
          </div>
          )
        }
          <Routes loggedIn={this.state.loggedIn} homecmp={homePg} btncmp={btnCompnent} logcmp={logFrm} />
        </div>
      </div>
    );
  }
}

export default App;
