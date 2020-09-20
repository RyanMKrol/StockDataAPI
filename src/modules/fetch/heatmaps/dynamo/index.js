import { DynamoReadBatch } from 'noodle-utils';

/**
 * Will fetch all of the Heatmap data for a set of tickers, for today
 *
 * @param {Array.<string>} tickers The tickers we want heatmap data for
 */
function fetchHeatmapDataForDay(tickers) {
  console.log(DynamoReadBatch);
  const readItems = createDynamoReadItems(tickers);
  console.log(readItems);
}

/**
 * Creates the read items based on the tickers we want data for
 *
 * @param {Array.<string>} tickers The tickers we want heatmap data for
 */
function createDynamoReadItems(tickers) {
  tickers.map((ticker) => ({
    expression: 'id = :tickerId',
    expressionData: undefined,
    key: ticker,
  }));
}

export default fetchHeatmapDataForDay;
