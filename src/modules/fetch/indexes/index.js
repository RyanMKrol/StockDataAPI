import indexData from '../../../../config/indexes.json';

/**
 * Returns the current stock indexes that we support
 *
 * @returns {Array.<string>} A list of indexes
 */
function fetchStockIndexes() {
  return Object.keys(indexData);
}

export default fetchStockIndexes;
