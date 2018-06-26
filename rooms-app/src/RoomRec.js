import React from 'react';


import './roomRec.css';
import OptionsCard from './OptionsCard.js';



const RoomRec = (props) => {
  return (
    <div className="stuffBehind "{(this.props.loggedIn ? '' : 'blurred')}"">
      <OptionsCard pic={this.props.pics[0]} txt='Individual'  description='Instantly reserve the closest room'/>
      <OptionsCard pic={this.props.pics[1]} txt='Group'  description='Instantly reserve the closest room for a group of people'/>
      <OptionsCard pic={this.props.pics[2]} txt='Search'  description='Advanced Search'/>
    </div>
  )
};

export default RoomRec;


/*var RoomRec = function (_React$Component) {
  _inherits(RoomRec, _React$Component);

  function RoomRec() {
    _classCallCheck(this, RoomRec);

    return _possibleConstructorReturn(this, (RoomRec.__proto__ || Object.getPrototypeOf(RoomRec)).apply(this, arguments));
  }

  _createClass(RoomRec, [{
    key: 'render',
    value: function render() {

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { ref: 'stuffBehind', className: 'stuffBehind ' + (this.props.loggedIn ? '' : 'blurred'), __source: {
            fileName: _jsxFileName,
            lineNumber: 12
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__OptionsCard_js__["a" ], { pic: this.props.pics[0], txt: 'Individual', description: 'Instantly reserve the closest room', __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__OptionsCard_js__["a" ], { pic: this.props.pics[1], txt: 'Group', description: 'Instantly reserve the closest room for a group of people', __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__OptionsCard_js__["a" ], { pic: this.props.pics[2], txt: 'Search', description: 'Advanced Search', __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          },
          __self: this
        })
      );
    }
  }]);

  return RoomRec;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);*/
