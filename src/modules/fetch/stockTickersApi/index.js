/**
 * @memberof module:fetch
 */

import fetch from 'node-fetch';

import { InvalidResponse } from '../../errors';

const BASE_URL = 'http://stocktickersapi.xyz/api/tickers';
const STOCK_INDEX = 'ftse_350';

/**
 * Fetches the tickers for the FTSE 350
 *
 * @returns {Array.<string>} Array of tickers in the FTSE 350
 */
async function fetchIndexTickers() {
  const url = buildApiUrl(STOCK_INDEX);

  process.stdout.write(`Using stocktickersapi URL: ${url}\n`);

  return fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      validateApiResponse(resJson);
      return resJson;
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * Builds the API URL to fetch our index tickers with
 *
 * @param {string} index The index to build a URL for
 * @returns {string} The API URL
 */
function buildApiUrl(index) {
  const url = `${BASE_URL}/${index}`;

  return url;
}

/**
 * Validates that the response we have from the tickers endpoint is valid
 *
 * @param {any} response The API response
 * @throws {InvalidResponse} If the response is invalid
 * @returns {void} Nothing
 */
function validateApiResponse(response) {
  if (!response) {
    throw new InvalidResponse('Could not validate the StockTickers API response');
  }
}

export default fetchIndexTickers;
