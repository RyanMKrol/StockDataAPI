/**
 * @memberof module:schedules
 */

/* eslint-disable no-await-in-loop */

import schedule from 'node-schedule';
import MailSender from 'noodle-email';

import { SUPPORTED_TIME_PERIODS, GMAIL_CREDENTIALS } from '../constants';
import { fetchTargetHeatmapDate, fetchTodayHeatmapDate } from '../utils';
import { fetchHeatmapDataForDate, fetchIndexTickers } from '../fetch';
import { InsufficientData } from '../errors';

import dataStore from '../data';

const mailClient = new MailSender(GMAIL_CREDENTIALS);
mailClient.setFrom('"StockPriceData-API" <ryankrol.m@gmail.com>');
mailClient.setTo('ryankrol.m@gmail.com');

const HEATMAP_ITEMS_NEEDED = 325;
/**
 * A method to setup a schedule for updating heatmap data
 */
async function scheduleHeatmapDataUpdates() {
  // always run this on the first call to ensure that the store is populated
  // on service start
  main();

  // update is scheduled to run every day at midnight
  schedule.scheduleJob('0 0 0 * * *', async () => {
    try {
      await mailClient.sendMail('Starting to update the Heatmap data!', '');
      await main();
      await mailClient.sendMail('Finished updating the Heatmap data!', '');
    } catch (e) {
      await mailClient.sendMail('Failed to update the Heatmap data!', '');
    }
  });
}

/**
 * The method to fetch and update heatmap data
 */
async function main() {
  const timePeriods = Object.keys(SUPPORTED_TIME_PERIODS);
  const tickers = (await fetchIndexTickers()).sort();

  const todayDate = fetchTodayHeatmapDate();
  const todayHeatmapData = await fetchHeatmapDataForDate(todayDate, tickers);

  for (let i = 0; i < timePeriods.length; i += 1) {
    const currentTimePeriod = timePeriods[i];

    const dateForTimePeriod = fetchTargetHeatmapDate(currentTimePeriod);

    const targetHeatmapData = await fetchHeatmapDataForDate(dateForTimePeriod, tickers);

    const data = generateHeatmapPrices(todayHeatmapData, targetHeatmapData);

    dataStore.storeData(currentTimePeriod, data);
  }
}

/**
 * Will generate the price differences between today and the target date
 *
 * @param {object} todayData Data for today
 * @param {object} targetData Data for the target date
 * @returns {object} Heatmap API response including ticker and change properties
 */
function generateHeatmapPrices(todayData, targetData) {
  const tickers = Object.keys(todayData);

  const heatmapData = tickers
    .map((ticker) => {
      const today = todayData[ticker];
      const target = targetData[ticker];

      const isTodayError = today.length !== 1 || today instanceof Error;
      const isTargetError = target.length !== 1 || target instanceof Error;

      return isTodayError || isTargetError
        ? undefined
        : {
          ticker,
          change: (today[0].price / target[0].price) * 100 - 100,
        };
    })
    .filter((x) => x);

  if (heatmapData.length < HEATMAP_ITEMS_NEEDED) {
    throw new InsufficientData(
      `Failed to fetch more than ${HEATMAP_ITEMS_NEEDED} items for a heatmap`,
    );
  }

  return heatmapData;
}

export default scheduleHeatmapDataUpdates;
