import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './card.css';




var OptionsCard = (props) => {
  return (
    <NavLink to="/button" className="card">
      <div>
        <div>
          <img src={props.pic} className="cardPic" alt="pic"/>
        </div>
        <div className="cardTitle">
          {props.txt}
        </div>
        <div className="cardDescrip">
          {props.description}
        </div>
      </div>
    </NavLink>
  )
};

export default RoomRec;






/*var OptionsCard = function OptionsCard(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b" ],
    { to: '/button', className: 'card', __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          },
          __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: props.pic, className: 'cardPic', alt: 'pic', __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          },
          __self: _this
        })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'cardTitle', __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          },
          __self: _this
        },
        props.txt
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'cardDescrip', __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          },
          __self: _this
        },
        props.description
      )
    )
  );
};*/
