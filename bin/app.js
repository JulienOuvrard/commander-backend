"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const bluebird = require("bluebird");
const commands_1 = require("./routes/commands");
const foods_1 = require("./routes/foods");
const drinks_1 = require("./routes/drinks");
const meals_1 = require("./routes/meals");
const rounds_1 = require("./routes/rounds");
class App {
    constructor() {
        mongoose.connect('mongodb://localhost:27017/commander-db', { promiseLibrary: bluebird })
            .then(() => console.log('connection successful'))
            .catch((err) => console.error(err));
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
        this.express.use('/api/commands', commands_1.default);
        this.express.use('/api/foods', foods_1.default);
        this.express.use('/api/drinks', drinks_1.default);
        this.express.use('/api/meals', meals_1.default);
        this.express.use('/api/rounds', rounds_1.default);
        this.express.use(function (err, req, res, next) {
            err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        this.express.use(function (err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = req.this.express.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.json('error');
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map