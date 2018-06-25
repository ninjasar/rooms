import React from 'react';
//import { Route } from 'react-router';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import history from 'history';
import axios from 'axios';

import './index.css';
import Btn from './Btn.js';
import Rooms from './Rooms.js';
import AppName from './AppName.js';

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      loggedIn: false,
      currentUser: '',
    }


  }

  //<Route path="*"/>
  render () {

    const url = 'https://virtserver.swaggerhub.com/nyustit/rooms/5.0/';

    const login = (response, userNm) => {
      console.log(response);
      this.setState({
        loggedIn: true,
      });
      getUser(userNm);
    };

    const setUser = (name) => {
      this.setState({
        currentUser: name,
      });
      this.forceUpdate();
      console.log(this.state.currentUser);
    }


    function getUser(userNm) { axios(
      {
        method: 'get',
        url: url + 'users',
        data : {
            "user": userNm,
          },
        headers : {
          'Accept': 'application/json',
        },
    }).then(response => setUser(response.data[0].name))
        .catch(function(error) {
        console.log(error.response);
      })
    };



    function loginFn(userNm, passWd) { axios(
      {
        method: 'post',
        url: url + 'auth/login',
        data : {
            "username": userNm,
            "password": passWd
          },
        headers : {
          'Accept': 'application/json',
        },
    }).then(response => login(response, userNm))
        .catch(function (error) {
        console.log(error.response);
      })
    };



    // const showLandingPg = () =>{ Nav.goToPage('/home/')};
    // const showBtn=() =>{ Nav.goToPage('/button/')};
    const btnCompnent = () => {
      return <Btn></Btn>
    }
    const rooms = () => {
      return <Rooms loggedIn={this.state.loggedIn} uName={this.state.currentUser} login={loginFn} />
    }
    return (
        <BrowserRouter>
            <div className="app">
              <Route exact path="/" component={rooms}/>
              <Route exact path="/logIn" component={rooms}/>
              <Route exact path="/home" component={rooms}/>
              <Route exact path="/button" component={btnCompnent}/>
            </div>
          </BrowserRouter>


    );
  }


}


export default App;
