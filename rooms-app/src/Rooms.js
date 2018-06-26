

import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';


import './index.css';
import AppName from './AppName.js';
import Banner from './Banner.js';
import RoomRec from './RoomRec.js';
import pic from './pic.jpeg';
//import Transparent from './Transparent.js';
import Login from './Login.js';
import Btn from './Btn.js';



var pics = [pic, pic, pic];

const Rooms = (props) => {
  return(
    <div id="homeLayout">
      <div className="topBar">
        <NavLink to="/button/" className="navLink">
          <AppName uName={props.uName}/>
        </NavLink>
      </div>
      <div>
        {props.loggedIn && <Banner/>}
        {!props.loggedIn && <Login loginClicked={props.login}/>}
      </div>
      {props.loggedIn && <RoomRec loggedIn={props.loggedIn} pics={pics}/>}
    </div>
  )
}






/*
var pics = [__WEBPACK_IMPORTED_MODULE_7__pic_jpeg___default.a, __WEBPACK_IMPORTED_MODULE_7__pic_jpeg___default.a, __WEBPACK_IMPORTED_MODULE_7__pic_jpeg___default.a];

var Rooms = function Rooms(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { id: 'homeLayout', __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'topBar', __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" ],
        { to: '/button/', className: 'navLink', __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          },
          __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__AppName__["a" ], { uName: props.uName, __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          },
          __self: _this
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: _this
      },
      props.loggedIn && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Banner_js__["a" ], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: _this
      }),
      console.log(props.loggedIn),
      !props.loggedIn && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Login_js__["a"], { loginClicked: props.login, __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: _this
      })
    ),
    props.loggedIn && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__RoomRec_js__["a" ], { loggedIn: props.loggedIn, pics: pics, __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: _this
    })
  );
};

 __webpack_exports__["a"] = (Rooms);

}),*/
