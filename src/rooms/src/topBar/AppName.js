import React from 'react';

import '../index.css';
import Logo from './Logo.js';
import BackButton from '../BackButton.js';



const AppName = (props) => {
  return (
    <div id="topBar">
      <div id="appNameContainer">
        {props.url !== "/home/"  && <BackButton/>}
        <div>
          <Logo/>
        </div>
        <div className="appName">
          nyu rooms
        </div>
      </div>
      <div className="usersName">
        {props.uName ? "Welcome, " + props.uName : ''}
      </div>
    </div>
  )
};

export default AppName;

/*
var AppName = function AppName(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { id: 'topBar', __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { id: 'appNameContainer', __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 10
          },
          __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Logo_js__["a" ], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 11
          },
          __self: _this
        })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'appName', __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          },
          __self: _this
        },
        'nyu rooms'
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'usersName', __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: _this
      },
      props.uName ? "Welcome, " + props.uName : ''
    )
  );
};
 __webpack_exports__["a"] = (AppName);*/
