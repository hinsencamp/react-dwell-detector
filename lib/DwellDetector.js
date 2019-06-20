"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var NO_OP = function NO_OP() {};

var DwellDetector = function DwellDetector(_ref) {
  var dwellingTime = _ref.dwellingTime,
      onDwell = _ref.onDwell,
      children = _ref.children;

  /*
   * State for tracking whether the element user is hovering on has been hovered
   * on for longer than the time deemed to be "dwelling".
   */
  var _useState = (0, _react.useState)(null),
      currentHoverTimeoutId = _useState[0],
      setCurrentHoverTimeoutId = _useState[1];

  var onMouseOverWrapper = function onMouseOverWrapper(elemProps) {
    return function (e) {
      /*
       * It's probably useful for the handler to know information about the
       * element that was dwelled upon, so all the elements props are passed
       * to onDwell.
       * */
      var timeout = setTimeout(function () {
        return onDwell.apply(void 0, [e].concat(elemProps));
      }, dwellingTime);
      setCurrentHoverTimeoutId(timeout);
      /*
       * Call client's onMouseOver if it's passed in child element's props
       * We override the onMouseOver prop with this wrapper, so this is needed
       * for the client to be able to implement any hover behaviour not related
       * to dwelling.
       */

      elemProps.onMouseOver && elemProps.onMouseOver(e);
    };
  };

  var onMouseOutWrapper = function onMouseOutWrapper(_ref2) {
    var id = _ref2.id,
        onMouseOut = _ref2.onMouseOut;
    return function (e) {
      clearTimeout(currentHoverTimeoutId);
      onMouseOut && onMouseOut(e);
    };
  };

  var modifiedChildren = _react.default.Children.map(children, function (child) {
    return _react.default.cloneElement(child, {
      onMouseOver: (0, _react.useMemo)(function () {
        return onMouseOverWrapper(child.props);
      }, [child.props]),
      onMouseOut: (0, _react.useMemo)(function () {
        return onMouseOutWrapper(child.props);
      }, [child.props])
    });
  });

  return _react.default.Children.toArray(modifiedChildren);
};

DwellDetector.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  dwellingTime: _propTypes.default.number,
  onDwell: _propTypes.default.func
};
DwellDetector.defaultProps = {
  children: [],
  dwellingTime: 333,
  onDwell: NO_OP
};
var _default = DwellDetector;
exports.default = _default;