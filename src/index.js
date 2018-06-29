import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";

import './index.css';
import App from './App.js';
import config from "./config";
import registerServiceWorker from "./registerServiceWorker";



ReactDOM.render (
    <Router>
      <App/>
    </Router>,
    document.getElementById('root'),
  );
  registerServiceWorker();
