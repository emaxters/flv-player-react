'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flv = require('./flv.min');

var _flv2 = _interopRequireDefault(_flv);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactFlvPlayer = function (_Component) {
  _inherits(ReactFlvPlayer, _Component);

  function ReactFlvPlayer(props) {
    _classCallCheck(this, ReactFlvPlayer);

    var _this = _possibleConstructorReturn(this, (ReactFlvPlayer.__proto__ || Object.getPrototypeOf(ReactFlvPlayer)).call(this, props));

    _this.myRef = _react2.default.createRef();
    _this.flvPlayerRef = function (element) {
      _this.flvPlayerRef = element;
    };
    return _this;
  }

  _createClass(ReactFlvPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          type = _props.type,
          url = _props.url,
          isLive = _props.isLive,
          enableStashBuffer = _props.enableStashBuffer,
          stashInitialSize = _props.stashInitialSize,
          hasAudio = _props.hasAudio,
          hasVideo = _props.hasVideo,
          handleError = _props.handleError,
          enableWarning = _props.enableWarning,
          enableError = _props.enableError;

      // 组件挂载后，拿到Ref进行操作

      if (_flv2.default.isSupported()) {
        var flvPlayer = _flv2.default.createPlayer({
          type: type,
          isLive: isLive,
          url: url,
          hasAudio: hasAudio,
          hasVideo: hasVideo
        }, {
          enableStashBuffer: enableStashBuffer,
          stashInitialSize: stashInitialSize
        });

        _flv2.default.LoggingControl.enableError = false;
        _flv2.default.LoggingControl.enableWarn = enableWarning;

        flvPlayer.attachMediaElement(this.myRef.current);
        flvPlayer.load();
        flvPlayer.play();
        flvPlayer.on('error', function (err) {
          // console.log(err);
          handleError(err);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          height = _props2.height,
          width = _props2.width,
          isMuted = _props2.isMuted;

      return _react2.default.createElement(
        'div',
       { style: { height: height, width: width }},
        _react2.default.createElement('video', {
          controls: true,
          muted: isMuted,
          ref: this.myRef,
          style: { height: height, width: width }
        })
      );
    }
  }]);

  return ReactFlvPlayer;
}(_react.Component);

ReactFlvPlayer.propTypes = {
  type: _propTypes2.default.string,
  url: _propTypes2.default.string.isRequired,
  isLive: _propTypes2.default.bool,
  hasAudio: _propTypes2.default.bool,
  hasVideo: _propTypes2.default.bool,
  enableStashBuffer: _propTypes2.default.bool,
  stashInitialSize: _propTypes2.default.number,
  height: _propTypes2.default.string,
  width: _propTypes2.default.string,
  isMuted: _propTypes2.default.bool,
  enableWarning: _propTypes2.default.bool,
  enableError: _propTypes2.default.bool,
  handleError: _propTypes2.default.func
};

ReactFlvPlayer.defaultProps = {
  type: 'flv',
  isLive: true,
  hasAudio: true,
  hasVideo: true,
  enableStashBuffer: true,
  stashInitialSize: 128,
  height: '100%',
  width: '100%',
  isMuted: false,
  handleError: function handleError(err) {
    console.log(err);
  },
  enableWarning: false,
  enableError: false
};

exports.default = ReactFlvPlayer;