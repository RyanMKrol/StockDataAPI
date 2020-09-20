import express from 'express';

import processRequest from '../modules/request';

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.use('/:timePeriod', async (req, res, next) => {
  const { timePeriod } = req.params;

  const request = await processRequest(timePeriod);

  console.log(request);
  res.send('Doing just fine');
});

export default router;
