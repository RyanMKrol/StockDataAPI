import express from 'express';
import fetchTickers from '../modules/fetch/tickers';

const router = express.Router();

router.get('/:index', async (req, res) => {
  const tickers = await fetchTickers(req.params.index);
  res.send(tickers);
});

export default router;
