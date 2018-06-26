import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Btn from './Btn.js';
import Rooms from './Rooms.js';

class App extends React.Component {

  constructor(props) {

      super(props);
      this.state = {
      loggedIn: false,
      currentUser: ''
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
    <BrowserRouter>
       <div className="app">
         <Route exact path="/" component={rooms}/>
          <Route exact path="/home" component={rooms}/>
          <Route exact path="/button" component={btnCompnent}/>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
