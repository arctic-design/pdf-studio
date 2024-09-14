/**
 * @name clearMarks
 * @methodOf TimerService
 * @description
 * Uses the HTML5 User Timing API to clear any set marks (or specific set marks)
 *
 * @param {String|Array} names name(s) of marks to clear
 */
function _clearMarks(names: string | string[]) {
  if (window.performance) {
    if (typeof names === 'string') {
      // convert the passed-in string to an array
      names = [names];
    }

    if (names && names.length > 0) {
      for (let i = 0; i < names.length; i++) {
        //window.performance.clearMarks(names[i]);
        window.performance.clearMarks(names[i] + '-start');
        window.performance.clearMarks(names[i] + '-end');
      }
    } else {
      window.performance.clearMarks();
    }
  }
}

/**
 * @name markExists
 * @methodOf TimerService
 * @description
 * Uses the HTML5 User Timing API to see if a specific mark exists
 *
 * @param {String} name name of mark
 */
function _markExists(name: string) {
  if (window.performance) {
    return window.performance.getEntriesByName(name) &&
      window.performance.getEntriesByName(name).length > 0
      ? true
      : false;
  } else {
    return false;
  }
}

/**
 * @name setMarkStart
 * @methodOf TimerService
 * @description
 * Uses the HTML5 User Timing API to set a starting mark
 *
 * @param {String} name name of mark to set
 */
function _setMarkStart(name: string) {
  if (window.performance && window.performance.mark) {
    window.performance.mark(name + '-start');
  }
}

/**
 * @name setMarkEnd
 * @methodOf TimerService
 * @description
 * Uses the HTML5 User Timing API to set an ending mark and take a measurement
 *
 * @param {String} name name of mark to set
 */
function _setMarkEnd(name: string) {
  if (window.performance && window.performance.mark) {
    window.performance.mark(name + '-end');
    _takeMeasurement(name);
  }
}

/**
 * @name setMark
 * @methodOf TimerService
 * @description
 * Uses the HTML5 User Timing API to set a generic mark
 *
 * @param {String} name name of mark to set
 */
function _setMark(name: string) {
  if (window.performance) {
    window.performance.mark(name);
  }
}

/**
 * @name takeMeasurement
 * @methodOf TimerService
 * @description
 * Uses the HTML5 User Timing API to store a measurement between two marks. You shouldn't need to call
 * this if you hare calling TimerService.setMarkEnd to set an end mark.
 *
 * @param {String} name name of measurement
 * @param {String=} startingMark name of startingMark (default: {name}-start
 * @param {String=} endingMark name of startingMark (default: {name}-end
 */
function _takeMeasurement(
  name: string,
  startingMark?: string,
  endingMark?: string
) {
  if (window.performance) {
    startingMark = startingMark ? startingMark : name + '-start';
    endingMark = endingMark ? endingMark : name + '-end';
    window.performance.measure(name, startingMark, endingMark);
  }
}

/**
 * @name dumpPerfStats
 * @methodOf TimerService
 * @description
 * Uses the HTML5 User Timing API to dump all the stored measurements to console (use Ctrl-Shift-Alt-T to do a dump)
 *
 * @param {String} name name of measurement
 * @param {String=} startingMark name of startingMark (default: {name}-start
 * @param {String=} endingMark name of startingMark (default: {name}-end
 */
function _dumpPerfStats() {
  if (window.performance) {
    const items = window.performance.getEntriesByType('measure');

    if (window.console.group) {
      window.console.group('PERF STATS');
    } else {
      window.console.log('PERF STATS');
      window.console.log('==============================');
    }

    for (let i = 0; i < items.length; ++i) {
      const req = items[i];
      const msg = req.name + ' took ' + (req.duration / 1000).toFixed(3) + 's';

      window.console.log(msg);
    }

    if (window.console.groupEnd) {
      window.console.groupEnd();
    } else {
      window.console.log('==============================');
    }

    window.performance.clearMarks();
    window.performance.clearMeasures();
  }
}

export const TimerService = {
  clearMarks: _clearMarks,
  dumpPerfStats: _dumpPerfStats,
  markExists: _markExists,
  setMark: _setMark,
  setMarkEnd: _setMarkEnd,
  setMarkStart: _setMarkStart,
  takeMeasurement: _takeMeasurement,
};
