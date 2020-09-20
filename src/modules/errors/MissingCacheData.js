/** @module errors */

/**
 * Used whenever the cache currently has no data to provide the response with
 */
class MissingCacheData extends Error {
  /**
   * @param {...any} params Anything you want passing to the Error constructor
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingCacheData);
    }

    this.Error = 'MissingCacheData';
    this.StatusCode = 500;
  }
}

export default MissingCacheData;
