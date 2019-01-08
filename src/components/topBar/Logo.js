import React from 'react';

import './topBar.css';
import logo from './logoNew.svg';



const Logo = (props) => {
  return (
    <div className="logoContainer">
      <div>
        <img src={logo} alt="logo" className="logo"/>
      </div>
    </div>
  )
};

export default Logo;


/*
var Logo = function (_React$Component) {
  _inherits(Logo, _React$Component);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
  }

  _createClass(Logo, [{
    key: 'render',


    //<Route path="*"/>
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'logoContainer', __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 16
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_2__torch_png___default.a, alt: 'torch', className: 'logo', __source: {
              fileName: _jsxFileName,
              lineNumber: 17
            },
            __self: this
          })
        )
      );
    }
  }]);

  return Logo;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

 __webpack_exports__["a"] = (Logo);*/
