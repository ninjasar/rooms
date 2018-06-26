import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import history from 'history';
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
    const login = () => {
      console.log('login called');
      this.setState({
      loggedIn: true,
          });
        };    //
    const showLandingPg = () =>{ Nav.goToPage('/home/')};    //
    const showBtn=() =>{ Nav.goToPage('/button/')};
    const btnCompnent = () => {
    return <Btn></Btn>
    }
    const rooms = () => {
      return <Rooms loggedIn={this.state.loggedIn} login={login} />
    }
    return (
    <BrowserRouter>
       <div className="app">
         <Route exact path="/" component={rooms}/>
          <Route exact path="/home" component={rooms}/>
          <Route exact path="/button" component={btnCompnent}/>
        </div>
      </BrowserRouter>
    }
  }
        export default App;
