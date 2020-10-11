import express from 'express';

import fetchTickers from '../modules/fetch';
import { scheduleTickerDataUpdates } from '../modules/schedules';

const router = express.Router();

// When this route is created, we need to setup the schedule that
// provides data to it
scheduleTickerDataUpdates();

router.get('/:index', async (req, res) => {
  const tickers = await fetchTickers(req.params.index);
  res.send(tickers);
});

export default router;
