'use strict';

var noop = function () {};

function State (name, stateTranstions, debug) {
  var self = this;

  self._name = name;
  self._stateTranstions = stateTranstions;
  self._debug = debug;

  self._state = null;
  self._leaveStateFn = noop;

  self.changeTo = function (newState, canEnterStateFn, enterStateFn, leaveStateFn) {
    var oldState = self._state;

    var validStates = self._stateTranstions[newState];

    if (validStates && validStates.indexOf(self._state) === -1) {
      throw new Error('Invalid state transition in "' + self._name + '" from "' + oldState + '" to "' + newState + '"');
    }

    if (canEnterStateFn && !canEnterStateFn(oldState)) {
      if (self._debug) {
        console.warn(self._name + ' > refused transition ' + oldState + ' > ' + newState);
      }
      return false;
    }

    self._leaveStateFn(newState);
    self._state = newState;
    self._leaveStateFn = leaveStateFn || noop;
    if (self._debug) {
      console.log(self._name + ' > ' + oldState + ' to ' + newState);
    }

    enterStateFn();
  };
}
