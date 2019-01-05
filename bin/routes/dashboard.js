"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const command_1 = require("../models/command");
class Dashboard {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.get('/commands/paid', function (req, res, next) {
            command_1.Command.aggregate().
                group({ _id: "$isPaid", count: { $sum: 1 } }).
                exec(function (err, products) {
                if (err)
                    return next(err);
                res.json(products);
            });
        });
    }
}
exports.default = new Dashboard().router;
//# sourceMappingURL=dashboard.js.map