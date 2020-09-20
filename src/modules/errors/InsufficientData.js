/** @module errors */

/**
 * Used whenever the we haven't been able to fetch enough data for a response
 */
class InsufficientData extends Error {
  /**
   * @param {...any} params Anything you want passing to the Error constructor
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InsufficientData);
    }

    this.Error = 'InsufficientData';
    this.StatusCode = 500;
  }
}

export default InsufficientData;
