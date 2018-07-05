class LandingPg extends React.Component {

  constructor(props) {

    super(props);

    this.loginClicked = this.props.loginClicked

}



    render() {

      const styles = {
        choiceBtn : {
          width: '12rem',
          height: '6rem',
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: '#e5cce3',
          marginTop: '30%',
          fontVariant: 'small-caps',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginRight: '25px',
          border: '1px solid black',
          borderRadius: '3px',
          color: '#303030'
        },
        description : {
          fontSize: '1.3rem',
          marginTop : '20px',
          marginLeft: '-20px',
          fontStyle : 'italic',
          width: '90%'
        },
        or : {
          fontSize: '1.5rem',
          marginRight: '25px',
          marginTop: '1.5rem',
          marginBottom: '-2rem'
        }
      }


      return (
        <div id="landingPg" >
          <div className="joinTxt">
          NYU Rooms <br/>
          </div>
          <div style={styles.description}>
            The easiest way to book your room at NYU
          </div>
          <div>
            <NavLink to="/login/">
              <button style={styles.choiceBtn} >
                log in
              </button>
            </NavLink>
          </div>
          <div style={styles.or}>or</div>
          <div>
            <button style={styles.choiceBtn} onClick={() => {this.loginClicked("rmr478", "password")}} >
              join now
            </button>
          </div>

        </div>

      )
    }
}

export default LandingPg;











var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(/*! ./index.css */ "./src/index.css");

var _jsxFileName = '/Users/sarahpierce/Desktop/rooms-app/src/Transparent.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Transparent = function (_React$Component) {
  _inherits(Transparent, _React$Component);

  function Transparent(props) {
    _classCallCheck(this, Transparent);

    var _this = _possibleConstructorReturn(this, (Transparent.__proto__ || Object.getPrototypeOf(Transparent)).call(this, props));

    _this.loginClicked = _this.props.loginClicked;

    return _this;
  }

  _createClass(Transparent, [{
    key: 'render',
    value: function render() {

      var styles = {
        logIn: {
          width: '12rem',
          height: '6rem',
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: '#a1b3d1',
          marginTop: '3%',
          fontVariant: 'small-caps',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginRight: '25px'
        },
        description: {
          fontSize: '1.5rem',
          marginTop: '20px',
          fontStyle: 'italic'
        }
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { ref: 'trans', id: 'loginPg', __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'joinTxt', __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            },
            __self: this
          },
          console.log(this.props.loginClicked),
          'NYU Rooms ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { style: styles.description, __source: {
              fileName: _jsxFileName,
              lineNumber: 46
            },
            __self: this
          },
          'The easiest way to book your room at NYU'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { style: styles.logIn, onClick: this.loginClicked, __source: {
              fileName: _jsxFileName,
              lineNumber: 50
            },
            __self: this
          },
          'join now'
        )
      );
    }
  }]);

  return Transparent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* unused harmony default export */ var _unused_webpack_default_export = (Transparent);
