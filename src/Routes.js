import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NotFound from "./containers/NotFound";


export default (props) =>
  <Switch>
    <Route exact path="/" component={props.homecmp}/>
    <Route exact path="/home" component={props.homecmp}/>
    <Route exact path="/login"  render={() => (
            props.loggedIn ? (
          <Redirect to="/home"/>
        ) : (
          props.logcmp()
        )
      )}/>
    <Route exact path="/button" component={props.btncmp}/>
    <Route component={NotFound} />
  </Switch>;
