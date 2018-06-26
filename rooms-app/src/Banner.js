import React from 'react';


import './index.css';
import ban from './banner.png';



const Banner = (props) => {
  return (
    <div id="bannerContainer">
      <img src={ban} alt="islands"/>
    </div>
  )
};

export default Banner;




/*
var Banner = function Banner(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { id: 'bannerContainer', __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_2__ban_png___default.a, alt: 'islands', __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: _this
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: _this
      },
      'Banner and stuff'
    )
  );
};

 __webpack_exports__["a"] = (Banner);*/
