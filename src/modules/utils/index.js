import moment from 'moment';
import { SUPPORTED_TIME_PERIODS } from '../constants';

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

export default fetchTargetHeatmapDate;
