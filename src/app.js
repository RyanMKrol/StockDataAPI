// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from 'http-errors';
import cors from 'cors';

import heatmapRouter from './routes/heatmaps';
import tickersRouter from './routes/tickers';
import indexesRouter from './routes/indexes';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/heatmap', heatmapRouter);
app.use('/api/tickers', tickersRouter);
app.use('/api/indexes', indexesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: '500 - Internal Server Error',
  });
});

export default app;
