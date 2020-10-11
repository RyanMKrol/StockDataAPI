import express from 'express';

import { DATA_STORE_KEY_TICKERS } from '../modules/constants';
import { scheduleTickerDataUpdates } from '../modules/schedules';
import { validateTickersDataRequestIndex } from '../modules/utils';
import { MissingCacheData } from '../modules/errors';
import dataStore from '../modules/data';

// When this route is created, we need to setup the schedule that
// provides data to it
scheduleTickerDataUpdates();

const router = express.Router();

router.get('/:index', async (req, res) => {
  const { index } = req.params;

  try {
    validateTickersDataRequestIndex(index);

    const data = dataStore.getData(DATA_STORE_KEY_TICKERS);

    if (!data || !data[index]) {
      throw new MissingCacheData();
    }

    res.send(data[index]);
  } catch (err) {
    res.status(err.StatusCode || 500);
    res.send({
      error: err.Error,
    });
  }
});

export default router;
