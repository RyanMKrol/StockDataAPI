/**
 * @memberof module:schedules
 */

import schedule from 'node-schedule';
import MailSender from 'noodle-email';

import { GMAIL_CREDENTIALS, DATA_STORE_KEY_TICKERS, SUPPORTED_INDEXES } from '../constants';
import dataStore from '../data';
import { fetchTickers } from '../fetch';

const mailClient = new MailSender(GMAIL_CREDENTIALS);
mailClient.setFrom('"StockPriceData-API" <ryankrol.m@gmail.com>');
mailClient.setTo('ryankrol.m@gmail.com');

/**
 * A method to setup a schedule for updating tickers data
 */
async function scheduleTickerDataUpdates() {
  // always run this on the first call to ensure that the store is populated
  // on service start
  main();

  // update is scheduled to run every day at midnight
  schedule.scheduleJob('0 0 0 * * *', async () => {
    try {
      fetchTickers();
      await mailClient.sendMail('Starting to update the Tickers data!', '');
      await main();
      await mailClient.sendMail('Finished updating the Tickers data!', '');
    } catch (e) {
      await mailClient.sendMail('Failed to update the Tickers data!', '');
    }
  });
}

/**
 * The method to fetch and update tickers data
 */
async function main() {
  const indexKeys = Object.keys(SUPPORTED_INDEXES);

  const tickerData = await indexKeys.reduce(async (acc, index) => {
    const currentData = await acc;
    currentData[index] = await fetchTickers(index);

    return currentData;
  }, Promise.resolve({}));

  dataStore.storeData(DATA_STORE_KEY_TICKERS, tickerData);
}

export default scheduleTickerDataUpdates;
