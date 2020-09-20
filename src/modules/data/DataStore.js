/**
 * This essentially models a dictionary with some simple methods.
 */
class DataStore {
  /**
   * Builds our DataStore
   */
  constructor() {
    this.store = {};
  }

  /**
   * Used to update the store with new data
   *
   * @param {string} key The key to store our data against
   * @param {any} data The data you want to store against your key
   */
  storeData(key, data) {
    this.store[key] = data;
  }

  /**
   * Used to fetch data from the store
   *
   * @param {string} key The key to use when fetching data from the store
   * @returns {any} The value stored against the key
   */
  getData(key) {
    return this.store[key];
  }
}

const dataStore = new DataStore();

export default dataStore;
