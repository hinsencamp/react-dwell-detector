import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const NO_OP = () => {};

const DwellDetector = ({ dwellingTime, onDwell, children }) => {
  /*
   * State for tracking whether the element user is hovering on has been hovered
   * on for longer than the time deemed to be "dwelling".
   */
  const [currentHoverTimeoutId, setCurrentHoverTimeoutId] = useState(null);

  const onMouseOverWrapper = elemProps => {
    return e => {
      /*
       * It's probably useful for the handler to know information about the
       * element that was dwelled upon, so all the elements props are passed
       * to onDwell.
       * */
      const timeout = setTimeout(() => onDwell(e, ...elemProps), dwellingTime);
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

  const onMouseOutWrapper = ({ id, onMouseOut }) => {
    return e => {
      clearTimeout(currentHoverTimeoutId);
      onMouseOut && onMouseOut(e);
    };
  };

  const modifiedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      onMouseOver: useMemo(() => onMouseOverWrapper(child.props), [
        child.props,
      ]),
      onMouseOut: useMemo(() => onMouseOutWrapper(child.props), [child.props]),
    })
  );

  return React.Children.toArray(modifiedChildren);
};

DwellDetector.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dwellingTime: PropTypes.number,
  onDwell: PropTypes.func,
};

DwellDetector.defaultProps = {
  children: [],
  dwellingTime: 333,
  onDwell: NO_OP,
};

export default DwellDetector;
