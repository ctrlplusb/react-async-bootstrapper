'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncBootstrapper;

var _reactTreeWalker = require('react-tree-walker');

var _reactTreeWalker2 = _interopRequireDefault(_reactTreeWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncBootstrapper(app, options) {
  var visitor = function visitor(element, instance) {
    if (instance && typeof instance.asyncBootstrap === 'function') {
      return instance.asyncBootstrap(options);
    }
    return true;
  };

  return (0, _reactTreeWalker2.default)(app, visitor, {}, options);
}