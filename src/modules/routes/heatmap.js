import express from 'express';

import { fetchIndexTickers } from '../fetch';

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', async (req, res, next) => {
  const tickers = await fetchIndexTickers();

  res.send(tickers);
});

export default router;
