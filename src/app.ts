// app.js
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createError from 'http-errors'
import cors from 'cors'

import heatmapRouter from './routes/heatmap'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/heatmap', heatmapRouter)

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
  next(createError(404))
})

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({
    error: '500 - Internal Server Error'
  })
})

export default app
