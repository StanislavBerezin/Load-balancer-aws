webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Main.css */ "./pages/Main.css");
/* harmony import */ var _Main_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Main_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Intro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Intro */ "./components/Intro.jsx");
/* harmony import */ var react_minimal_pie_chart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-minimal-pie-chart */ "./node_modules/react-minimal-pie-chart/dist/index.js");
/* harmony import */ var react_minimal_pie_chart__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_minimal_pie_chart__WEBPACK_IMPORTED_MODULE_5__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Cloud =
/*#__PURE__*/
function (_Component) {
  _inherits(Cloud, _Component);

  function Cloud() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Cloud);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Cloud)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      search: "",
      title: "",
      loading: false,
      error: false,
      positive: 10,
      negative: 10,
      negativePie: 10,
      positivePie: 10,
      sum: 0,
      negPercent: 50,
      posPercent: 50,
      negWords: [],
      posWords: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (event) {
      _this.setState({
        search: event.target.value
      });

      console.log(_this.state.test);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleStaticSearch", function (event) {
      event.preventDefault();
      console.log("static");
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/streamTweets", {
        search: "Trump"
      }).then(function (response) {
        console.log(response);
      }).catch(function (e) {
        console.log(e);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleStop", function (event) {
      event.preventDefault();
      console.log("shoud stop");
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/api/hello");
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleLiveSearch", function (event) {
      event.preventDefault();
      console.log("live");
      var search = _this.state.search;

      _this.setState({
        title: _this.state.search,
        negativePie: 10,
        positivePie: 10,
        positive: 10,
        negative: 10,
        negPercent: 50,
        posPercent: 50,
        negWords: [],
        posWords: []
      });

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("/specificSearch", {
        search: search
      });
      console.log(search);
      var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_1___default()();

      try {
        socket.on("connect", function () {
          console.log("Socket Connected");
          socket.on("tweets", function (data) {
            var sum = _this.state.positivePie + _this.state.negativePie;

            _this.setState({
              sum: sum
            });

            if (data.score > 0) {
              var positiveNum = [data.score].concat(_this.state.positive);
              var positiveWords = [data.positiveWords].concat(_this.state.posWords);
              var percent = _this.state.positivePie * 100 / _this.state.sum;

              _this.setState({
                positive: positiveNum,
                posPercent: percent,
                posWords: positiveWords
              });

              _this.setState({
                positivePie: _this.state.positive.reduce(_this.getSum)
              });

              console.log(_this.state.positivePie);
            } else {
              var negativeNum = [data.score].concat(_this.state.negative);
              var negativeWords = [data.negativeWords].concat(_this.state.negWords);

              var _percent = _this.state.negativePie * 100 / _this.state.sum;

              _this.setState({
                negative: negativeNum,
                negPercent: _percent,
                negWords: negativeWords
              });

              _this.setState({
                negativePie: Math.abs(_this.state.negative.reduce(_this.getSum))
              });
            }
          });
        });
        socket.on("disconnect", function () {
          socket.off("tweets");
          socket.removeAllListeners("tweets");
          console.log("Socket Disconnected");
        });
        socket.on("error", function (err) {
          console.log("Socket.IO Error");
          console.log(err); // this is changed from your code in last comment
        });
      } catch (e) {
        console.log(e);
      }
    });

    return _this;
  }

  _createClass(Cloud, [{
    key: "getSum",
    value: function getSum(total, num) {
      return total + num;
    }
  }, {
    key: "render",
    // FROM ME FINISHED
    value: function render() {
      var posWords = null;
      posWords = this.state.posWords.map(function (e, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index
        }, " ", e, " ");
      });
      var negWords = null;
      negWords = this.state.negWords.map(function (e, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index
        }, " ", e, " ");
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, " ", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Intro__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "Main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, " View statistics "), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "Bar"
      }, " ", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: this.handleLiveSearch,
        className: "form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "search",
        name: "name",
        onChange: this.handleChange
      }), " "), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "searchButtons"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        name: "live",
        value: "Live stream"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        onClick: this.handleStaticSearch,
        name: "static",
        value: "View posts"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        onClick: this.handleStop,
        name: "static",
        value: "Stop"
      })), " "), " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, " Statistics for ", this.state.title, " "), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Positive ", this.state.posPercent.toString().substr(0, 4), " % ", " ", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pos"
      }, " __ "), " "), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Negative ", this.state.negPercent.toString().substr(0, 4), " % ", " ", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "neg"
      }, " __ "), " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "statistics"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_minimal_pie_chart__WEBPACK_IMPORTED_MODULE_5___default.a, {
        className: "chart",
        data: [{
          title: "Test",
          value: this.state.positivePie,
          color: "#E38627"
        }, {
          title: "Two",
          value: this.state.negativePie,
          color: "#C13C37"
        }]
      }), " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "goodWords"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, " Positive words "), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, " ", posWords, " "), " "), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "badWords"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, " Negative words "), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, " ", negWords, " "), " "), " "), " "), " ");
    }
  }]);

  return Cloud;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Cloud);
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=index.js.ee6454bba47a82fcdc11.hot-update.js.map