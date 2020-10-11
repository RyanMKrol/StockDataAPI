import { SUPPORTED_INDEXES } from '../../constants';

/**
 * Returns the current stock indexes that we support
 *
 * @returns {Array.<string>} A list of indexes
 */
function fetchStockIndexes() {
  return Object.keys(SUPPORTED_INDEXES);
}

export default fetchStockIndexes;
