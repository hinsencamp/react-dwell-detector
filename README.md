# react-dwell-detector

> Filter out incidental hover events. Call a callback when the user is "dwelling" on something.
> Wrapping component is invisible - does not affect your DOM tree structure.

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i --save react-dwell-detector
```

## Example

See https://a-website-i-need-to-make for an example use-case using `react-dwell-detector`: submitting requests to a tracking API.

## Usage

```javascript
import React from 'react';
import DwellDetector from 'react-dwell-detector';


const CUSTOM_DWELLING_TIME = 300;

const ExampleComponent = props => {
  const trackDwell = (e, elemProps) => {
    /*
    * This handler will fire only when user hovers for longer than
    * USER_DWELLING_TIME. You could POST to a tracking API here, and have
    * access to any data contained in MyCustomComponent's props.
    * e.g. const { customData } = elemProps;
    */
  };

  const optionalHoverHandler = e => {
    // This will still fire on every hover
  };

  return (
    <DwellDetector
      onDwell={trackDwell}
      dwellingTime={CUSTOM_DWELLING_TIME} // Optional, defaults to 333ms
    >
      <MyCustomComponent
        customData={{ id: 1, name: 'Atticus Finch', age: 48 }}
        onMouseHover={optionalHoverHandler}
      />
    </DwellDetector>;
  );
};
```

## Why not just use \_.debounce?

Debouncing prevents a function being called more than once in a given time frame. In the case of trailing debounce, the arguments from the last call are used to call the function at the end of the debounce period.

For a use-case like tracking a user hover, if a user moves the mouse over a series of elements to interact with some other element, the last mouseover of the irrelevent elements will always be tracked by a trailing debounce, even if it wasn't the focus of the user's attention.

`react-dwell-detector` simply monitors the length of each hover, and calls the `onDwell` callback if the dwelling time elapses before the mouse leaves the element.

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
