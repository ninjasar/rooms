import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./containers/NotFound";
import Btn from './Btn.js';
import Rooms from './Rooms.js';

export default (props) =>
  <Switch>
    <Route exact path="/" component={props.roomscmp}/>
    <Route exact path="/home" component={props.roomscmp}/>
    <Route exact path="/button" component={props.btncmp}/>
    <Route component={NotFound} />
  </Switch>;
