import React from 'react';
import {BrowserRouter, NavLink } from 'react-router-dom';


import './index.css';
import ban from './banner.png';



const Btn = (props) => {
  return (
    <div className="homeLayout">
      <NavLink to="/home/">
        <button className="helloBtn">
          hello
        </button>
      </NavLink>
    </div>
  )
};

export default Btn;



/*
var Btn = function (_React$Component) {
  _inherits(Btn, _React$Component);

  function Btn(props) {
    _classCallCheck(this, Btn);

    return _possibleConstructorReturn(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).call(this, props));
  }

  _createClass(Btn, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'homeContainer', __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b"],
          { to: '/home/', __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { className: 'helloBtn', __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              },
              __self: this
            },
            'Hello'
          )
        )
      );
    }
  }]);

  return Btn;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

 __webpack_exports__["a"] = (Btn); */
