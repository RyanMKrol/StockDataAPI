/**
 * @memberof module:request
 */

import moment from 'moment';

import SUPPORTED_TIME_PERIODS from '../constants';
import { TimePeriodUnsupported } from '../errors';
import { fetchIndexTickers } from '../fetch';

/**
 * Processes the request being handled by the API
 *
 * @param {string} timePeriod The time period passed in from the request
 * @throws {module.InvalidResponse} When the tickers could not be fetched
 * @throws {TimePeriodUnsupported} When the time period is not supported
 */
async function processRequest(timePeriod) {
  validateTimePeriod(timePeriod);

  const tickers = await fetchIndexTickers();
  const targetDate = fetchTargetHeatmapDate(timePeriod);
  console.log(tickers);
  console.log(targetDate);
}

/**
 * Validates whether the time period passed in is valid or not
 *
 * @param {string} timePeriod The time period passed in from the request
 * @throws {TimePeriodUnsupported} When the time period is not supported
 */
function validateTimePeriod(timePeriod) {
  if (!Object.keys(SUPPORTED_TIME_PERIODS).includes(timePeriod)) {
    throw new TimePeriodUnsupported(`${timePeriod} is not a supported time period`);
  }
}

/**
 * Gets the date indicated by the request to the API
 *
 * @param {string} timePeriod The time period passed in from the request
 * @returns {string} The date of the price we want to fetch for our tickers
 */
function fetchTargetHeatmapDate(timePeriod) {
  const daysToRemove = SUPPORTED_TIME_PERIODS[timePeriod];
  const date = moment();

  date.subtract(daysToRemove, 'days');

  return date.format('YYYY-MM-DD');
}

export default processRequest;
