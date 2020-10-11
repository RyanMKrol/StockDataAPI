import express from 'express';
import fetchStockIndexes from '../modules/fetch/indexes';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send(fetchStockIndexes());
});

export default router;
