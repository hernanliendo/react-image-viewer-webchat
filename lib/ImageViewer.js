'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageViewer = function (_Component) {
    _inherits(ImageViewer, _Component);

    function ImageViewer(props) {
        _classCallCheck(this, ImageViewer);

        var _this = _possibleConstructorReturn(this, (ImageViewer.__proto__ || Object.getPrototypeOf(ImageViewer)).call(this, props));

        var defaultConfig = {
            viewedImageSize: 0.9,
            backgroundOpacity: 0.4,
            stretchFromAnimate: true
        };

        _this.config = Object.assign({}, defaultConfig, _this.props.config);

        _this.constainerStyle = {
            position: 'relative',
            left: 0,
            top: 0,
            backgroundImage: 'url("' + props.image + '")',
            opacity: 1,
            transition: 'transform 0.4s cubic-bezier(0, 0, 0.3, 1)',
            zIndex: 10
        };
        _this.viewedContainerStyle = {
            zIndex: 20
        };

        _this.state = {
            isLoaded: false,
            isViewing: false,
            imageComputedStyle: {
                width: 0,
                height: 0
            },
            translateX: 0,
            translateY: 0
        };

        _this.handleContainerTap = _this.handleContainerTap.bind(_this);
        _this.hanleImageTap = _this.hanleImageTap.bind(_this);
        return _this;
    }

    _createClass(ImageViewer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.$preload.addEventListener('load', function () {
                _this2.computeImagePosition();
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.ontouchmove = function () {
                return true;
            };
        }
    }, {
        key: 'getStyle',
        value: function getStyle(styleName) {
            var win = this.$container.ownerDocument.defaultView;
            return win.getComputedStyle(this.$container, null)[styleName];
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            var _this3 = this;

            return new Promise(function (resolve) {
                var img = document.createElement('img');
                img.src = _this3.props.image;
                var result = void 0;
                img.onload = function () {
                    result = {
                        width: img.hasOwnProperty('naturalWidth') ? img.naturalWidth : img.width,
                        height: img.hasOwnProperty('naturalHeight') ? img.naturalHeight : img.height
                    };
                    resolve(result);
                };
            });
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            var box = this.$image.getBoundingClientRect();
            return {
                top: box.top,
                left: box.left + window.pageXOffset - document.documentElement.clientLeft
            };
        }
    }, {
        key: 'computeViewedPosition',
        value: function computeViewedPosition() {
            var imagePosition = this.getPosition();
            this.setState({
                translateX: (this.screenSize.width - this.state.imageComputedStyle.width) / 2 - imagePosition.left,
                translateY: (this.screenSize.height - this.state.imageComputedStyle.height) / 2 - imagePosition.top
            });
        }
    }, {
        key: 'computeImagePosition',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var containerSize, imageRealSize, screenSize, imageAspectRatio, containerAspectRatio, viewedWidth, viewedHeight, scale, heightScale, _scale, widthScale;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                containerSize = {
                                    width: parseFloat(this.getStyle('width')),
                                    height: parseFloat(this.getStyle('height'))
                                };
                                _context.next = 3;
                                return this.getSize();

                            case 3:
                                imageRealSize = _context.sent;

                                this.setState({
                                    isLoaded: true
                                });
                                screenSize = this.screenSize = {
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                };
                                imageAspectRatio = this.imageAspectRatio = imageRealSize.width / imageRealSize.height;
                                containerAspectRatio = containerSize.width / containerSize.height;

                                if (imageAspectRatio > screenSize.width / screenSize.height) {
                                    viewedWidth = screenSize.width * this.config.viewedImageSize;
                                    viewedHeight = viewedWidth / imageAspectRatio;
                                } else {
                                    viewedHeight = screenSize.height * this.config.viewedImageSize;
                                    viewedWidth = viewedHeight * imageAspectRatio;
                                }

                                if (imageAspectRatio > containerAspectRatio) {
                                    scale = this.scale = containerSize.width / viewedWidth;

                                    // only use heightScale when stretchFromAnimate is true

                                    heightScale = containerSize.height / viewedHeight;

                                    this.setState({
                                        imageComputedStyle: {
                                            width: viewedWidth,
                                            height: viewedHeight,
                                            transform: 'scale(' + scale + ', ' + (this.config.stretchFromAnimate ? heightScale : scale) + ')',
                                            left: 0,
                                            top: this.config.stretchFromAnimate ? 0 : (containerSize.height - containerSize.width / imageAspectRatio) / 2
                                        }
                                    });
                                } else {
                                    _scale = this.scale = containerSize.height / viewedHeight;

                                    // only use widthScale when stretchFromAnimate is true

                                    widthScale = containerSize.width / viewedWidth;

                                    this.setState({
                                        imageComputedStyle: {
                                            width: viewedWidth,
                                            height: viewedHeight,
                                            transform: 'scale(' + (this.config.stretchFromAnimate ? widthScale : _scale) + ', ' + _scale + ')',
                                            left: this.config.stretchFromAnimate ? 0 : (containerSize.width - containerSize.height * imageAspectRatio) / 2,
                                            top: 0
                                        }
                                    });
                                }

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function computeImagePosition() {
                return _ref.apply(this, arguments);
            }

            return computeImagePosition;
        }()
    }, {
        key: 'handleContainerTap',
        value: function handleContainerTap(event) {
            event.preventDefault();
            if (!this.state.isViewing && this.state.isLoaded) {
                // disable document scroll
                document.body.style.height = '100%';
                document.body.style.overflow = 'hidden';
                document.body.ontouchmove = function (e) {
                    return e.preventDefault();
                };

                this.computeViewedPosition();
                this.setState({
                    isViewing: true
                });
            }
        }
    }, {
        key: 'hanleImageTap',
        value: function hanleImageTap(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.state.isViewing) {
                // enable document scroll
                document.body.style.height = '';
                document.body.style.overflow = '';
                document.body.ontouchmove = function () {
                    return true;
                };

                this.setState({
                    isViewing: false
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var containerStyle = Object.assign({}, this.constainerStyle, this.props.style, this.state.isViewing ? this.viewedContainerStyle : undefined);
            var imageStyle = Object.assign({}, {
                position: 'absolute',
                backgroundSize: '100% 100%',
                backgroundImage: 'url("' + this.props.image + '")',
                pointerEvents: 'none',
                opacity: 0,
                backfaceVisibility: 'hidden',
                transformOrigin: '0 0 0',
                transition: 'transform 0.4s cubic-bezier(0, 0, 0.3, 1), opacity 0.4s ease-in 0.2s',
                zIndex: 10
            }, this.state.imageComputedStyle, this.state.isViewing ? {
                pointerEvents: 'auto',
                transform: 'scale(1, 1) translate3d(' + this.state.translateX + 'px, ' + this.state.translateY + 'px, 0)',
                opacity: 1,
                transition: 'transform 0.4s cubic-bezier(0, 0, 0.3, 1)',
                zIndex: 99
            } : undefined);
            var backgroundStyle = this.state.isViewing ? {
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, ' + this.config.backgroundOpacity + ')',
                transition: 'background-color 0.4s ease 0.2s'
            } : undefined;
            return _react2.default.createElement(
                'div',
                {
                    className: this.props.className,
                    style: containerStyle,
                    ref: function ref(element) {
                        return _this4.$container = element;
                    },
                    onTouchTap: this.handleContainerTap
                },
                _react2.default.createElement('div', {
                    style: imageStyle,
                    ref: function ref(element) {
                        return _this4.$image = element;
                    },
                    onTouchTap: this.hanleImageTap
                }),
                _react2.default.createElement('div', {
                    style: backgroundStyle,
                    onTouchTap: this.hanleImageTap
                }),
                _react2.default.createElement('img', {
                    src: this.props.image,
                    style: { display: 'none' },
                    alt: 'preload',
                    ref: function ref(element) {
                        return _this4.$preload = element;
                    }
                })
            );
        }
    }]);

    return ImageViewer;
}(_react.Component);

exports.default = ImageViewer;

ImageViewer.propTypes = {
    className: _propTypes2.default.string,
    style: _reactStyleProptype2.default,
    image: _propTypes2.default.string.isRequired,
    config: _propTypes2.default.shape({
        viewedImageSize: _propTypes2.default.number
    })
};