import * as path from 'path';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as fileupload from 'express-fileupload';
import * as bluebird from 'bluebird';
import * as socketIo from 'socket.io';

import Commands from './routes/commands';
import Foods from './routes/foods';
import Drinks from './routes/drinks';
import Meals from './routes/meals';
import Rounds from './routes/rounds';
import Dashboard from './routes/dashboard';


class App {
  // ref to Express instance
  public express: express.Application;

  private dbHostDev = 'mongodb://localhost:27017/commander-db';
  private dbHostProd = 'mongodb://database:27017/commander-db';
  private dbHost = process.env.PROD ? this.dbHostProd : this.dbHostDev;

  private options = {
    // promiseLibrary: bluebird,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    connectTimeoutMS: 3000,
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
  }

  private connectWithRetry = () => {
    console.log('MongoDB connection with retry', this.dbHost)
    mongoose.connect(this.dbHost, this.options).then(() => {
      console.log('MongoDB is connected');
    }).catch(err => {
      console.error(err)
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
      setTimeout(this.connectWithRetry, 5000)
    })
  }

  //Run configuration methods on the Express instance.
  constructor() {
    /*mongoose.connect(this.dbHost, { promiseLibrary: bluebird })
      .then(() => console.log('connection successful'))
      .catch((err) => console.error(err))*/
    this.connectWithRetry();
    this.initBackend();
  }

  private initBackend() {
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
    const isDev = this.express.get('env') === 'development';

    this.express.use('/api/dashboard', Dashboard);
    this.express.use('/api/commands', Commands);
    this.express.use('/api/foods', Foods);
    this.express.use('/api/drinks', Drinks);
    this.express.use('/api/meals', Meals);
    this.express.use('/api/rounds', Rounds);

    // catch 404 and forward to error handler
    this.express.use(function (err, req, res, next) {
      let error = { message: new Error('Not Found'), status: 404};
      if(err) {
        error.message = new Error(`Internal Server error: ${err}` );
        error.status = 500;
      }
      next(error);
    });
    
    // error handler
    this.express.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error =  isDev ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json(err.message.message);
    });
  }
}


export default new App().express;