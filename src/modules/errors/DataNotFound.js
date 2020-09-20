/** @module errors */

/**
 * Used whenever a request provides an unsupported time period
 */
class DataNotFound extends Error {
  /**
   * @param {...any} params Anything you want passing to the Error constructor
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DataNotFound);
    }

    this.Error = 'DataNotFound';
    this.StatusCode = 400;
  }
}

export default DataNotFound;
