import * as path from 'path';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as fileupload from 'express-fileupload';
import * as bluebird from 'bluebird';

import Commands from './routes/commands';
import Foods from './routes/foods';
import Drinks from './routes/drinks';
import Meals from './routes/meals';
import Rounds from './routes/rounds';


class App {
  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    mongoose.connect('mongodb://localhost:27017/commander-db', { promiseLibrary: bluebird })
      .then(() => console.log('connection successful'))
      .catch((err) => console.error(err))
    this.express = express();
    this.middleware();
    this.statics();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(fileupload());
    this.express.use(cors());
  }

  // Configure statics routes.
  private statics(): void {
    this.express.use('/receipt', express.static(__dirname + '/receipt'));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/api/commands', Commands);
    this.express.use('/api/foods', Foods);
    this.express.use('/api/drinks', Drinks);
    this.express.use('/api/meals', Meals);
    this.express.use('/api/rounds', Rounds);

    // catch 404 and forward to error handler
    this.express.use(function (err, req, res, next) {
      err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    this.express.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.this.express.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json('error');
    });
  }
}


export default new App().express;