/**
 * @memberof module:errors
 */

/**
 * Used whenever a request provides an unsupported time period
 */
class TimePeriodUnsupported extends Error {
  /**
   * @param {...any} params Anything you want passing to the Error constructor
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimePeriodUnsupported);
    }

    this.Error = 'TimePeriodUnsupported';
    this.StatusCode = 400;
  }
}

export default TimePeriodUnsupported;
