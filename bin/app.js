"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const commands_1 = require("./routes/commands");
const foods_1 = require("./routes/foods");
const drinks_1 = require("./routes/drinks");
const meals_1 = require("./routes/meals");
const rounds_1 = require("./routes/rounds");
const dashboard_1 = require("./routes/dashboard");
class App {
    constructor() {
        this.dbHostDev = 'mongodb://localhost:27017/commander-db';
        this.dbHostProd = 'mongodb://database:27017/commander-db';
        this.dbHost = process.env.PROD ? this.dbHostProd : this.dbHostDev;
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            connectTimeoutMS: 3000,
            reconnectTries: 30,
            reconnectInterval: 500,
            poolSize: 10,
            bufferMaxEntries: 0
        };
        this.connectWithRetry = () => {
            console.log('MongoDB connection with retry', this.dbHost);
            mongoose.connect(this.dbHost, this.options).then(() => {
                console.log('MongoDB is connected');
            }).catch(err => {
                console.error(err);
                console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
                setTimeout(this.connectWithRetry, 5000);
            });
        };
        this.connectWithRetry();
        this.initBackend();
    }
    initBackend() {
        this.express = express();
        this.middleware();
        this.statics();
        this.routes();
    }
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(fileupload());
        this.express.use(cors());
    }
    statics() {
        this.express.use('/receipt', express.static(__dirname + '/receipt'));
    }
    routes() {
        const isDev = this.express.get('env') === 'development';
        this.express.use('/api/dashboard', dashboard_1.default);
        this.express.use('/api/commands', commands_1.default);
        this.express.use('/api/foods', foods_1.default);
        this.express.use('/api/drinks', drinks_1.default);
        this.express.use('/api/meals', meals_1.default);
        this.express.use('/api/rounds', rounds_1.default);
        this.express.use(function (err, req, res, next) {
            let error = { message: new Error('Not Found'), status: 404 };
            if (err) {
                error.message = new Error(`Internal Server error: ${err}`);
                error.status = 500;
            }
            next(error);
        });
        this.express.use(function (err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = isDev ? err : {};
            res.status(err.status || 500);
            res.json(err.message.message);
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map