import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute.js";
import SearchPg from "./containers/SearchPg";
import NotFound from "./containers/NotFound";



export default (props) =>
  <Switch>
    <Route exact path="/" component={props.homecmp}/>
    <Route path="/home" component={props.homecmp}/>
    <Route path="/login"  render={() => (
            props.loggedIn ? (
          <Redirect to="/home"/>
        ) : (
          props.logcmp()
        )
    )}/>
    <PrivateRoute path='/button'
    component={props.btncmp}
    isLoggedIn={props.loggedIn}
    />
    <PrivateRoute path='/currentReservation'
    component={() => <NotFound url='/currentReservation'/>}
    isLoggedIn={props.loggedIn}
    />
    <PrivateRoute path='/advancedSearch'
    component={() => <SearchPg url='/advancedSearch'/>}
    isLoggedIn={props.loggedIn}
    />
    <PrivateRoute path='/makeReservation'
    component={() => <SearchPg url='/makeReservation'/>}
    isLoggedIn={props.loggedIn}
    />
    <Route component={NotFound} />
  </Switch>;
