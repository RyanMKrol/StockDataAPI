import express from 'express';

import { DATA_STORE_KEY_HEATMAPS } from '../modules/constants';
import { scheduleHeatmapDataUpdates } from '../modules/schedules';
import dataStore from '../modules/data';
import { validateHeatmapsRequestTimePeriod } from '../modules/utils';
import { MissingCacheData } from '../modules/errors';

// When this route is created, we need to setup the schedule that
// provides data to it
scheduleHeatmapDataUpdates();

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.use('/:timePeriod', async (req, res, next) => {
  const { timePeriod } = req.params;

  try {
    validateHeatmapsRequestTimePeriod(timePeriod);
    const data = dataStore.getData(DATA_STORE_KEY_HEATMAPS);

    if (!data || !data[timePeriod]) {
      throw new MissingCacheData();
    }
    res.send(data[timePeriod]);
  } catch (err) {
    res.status(err.StatusCode || 500);
    res.send({
      error: err.Error,
    });
  }
});

export default router;
