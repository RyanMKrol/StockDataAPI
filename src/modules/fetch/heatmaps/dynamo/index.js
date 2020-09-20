/**
 * @memberof module:fetch
 */

/* eslint-disable no-await-in-loop */

import { DynamoReadBatch } from 'noodle-utils';
import { DYNAMO_CREDENTIALS, DYNAMO_REGION } from '../../../constants';
import { formatHeatmapDate } from '../../../utils';
import { DataNotFound } from '../../../errors';

// Table where ticker data is kept
const DYNAMO_TABLE = 'TickerData';

// How many dates we'll try to find data for
const MAX_RETRY_DATES = 7;

/**
 * Will fetch all of the Heatmap data for a set of tickers, for today
 *
 * @param {module:utils.Moment} date The date we want to fetch price data for
 * @param {Array.<string>} tickers The tickers we want heatmap data for
 * @returns {object} An object containing all price data for a given date
 */
async function fetchHeatmapDataForDate(date, tickers) {
  const batchReader = new DynamoReadBatch(DYNAMO_CREDENTIALS, DYNAMO_REGION, DYNAMO_TABLE);

  const targetDate = await findNearestDateWithData(batchReader, date, tickers[0]);

  const heatmapDateReadItems = createDynamoReadItems(targetDate, tickers);

  const data = await batchReader.readItems(heatmapDateReadItems);

  return data;
}

/**
 * Creates the read items based on the tickers we want data for
 *
 * @param {module:utils.Moment} date The date we want to fetch price data for
 * @param {Array.<string>} tickers The tickers we want heatmap data for
 * @returns {object} An object representing read data for the DynamoBatch class
 */
function createDynamoReadItems(date, tickers) {
  const formattedDate = formatHeatmapDate(date);

  return tickers.map((ticker) => ({
    expression: 'id = :id',
    expressionData: {
      ':id': `${ticker}-${formattedDate}`,
    },
    key: ticker,
  }));
}

/**
 * Method used to find which date we should use to base our heatmap on. If
 * the date falls on a weekend, we won't find any data to use, so we trace
 * back up to a maximum until we find data. The assumption is that if we find
 * information for a price for one stock, we'll find it for all the others.
 *
 * @param {DynamoReadBatch} batchReader Class used to read dynamo data
 * @param {string} date Date used to start the search with
 * @param {string} ticker The tickers used to find data for
 * @throws {DataNotFound} When we can't find a date to work with
 * @returns {module:utils.Moment} A date object to use for our heatmap data
 */
async function findNearestDateWithData(batchReader, date, ticker) {
  for (let i = 0; i < MAX_RETRY_DATES; i += 1) {
    const readItem = createDynamoReadItems(date, [ticker]);
    const data = await batchReader.readItems(readItem);

    const dataValues = Object.values(data);

    if (dataValues.length === 1 && !(dataValues[0] instanceof Error)) {
      return date;
    }

    date.subtract(1, 'days');
  }

  throw new DataNotFound(`Could not find any data after retries for ticker: ${ticker}`);
}

export default fetchHeatmapDataForDate;
