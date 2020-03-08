import express from 'express'

enum SupportedTimePeriods {
  OneMonth = 'one_month',
  ThreeMonth = 'three_month',
  SixMonth = 'six_month',
  OneYear = 'one_year',
  TwoTear = 'two_year',
}

const router = express.Router()

router.use('/:timePeriod', async (req, res, next) => {
  const timePeriod: string = req.params.timePeriod
  const enumValues: Array<string> = Object.values(SupportedTimePeriods)

  if (!enumValues.includes(timePeriod)) {
    res.status(404).send({
      error: 'Not a supported time period'
    })
  } else {
    next()
  }
})

router.get('/:timePeriod', async (req, res, next) => {
  res.send('Sending back some data')
})

export default router
