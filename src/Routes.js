import React from "react";
<<<<<<< HEAD
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    { /* Finally, catch all unmatched routes */ }
=======
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
>>>>>>> master
    <Route component={NotFound} />
  </Switch>;
