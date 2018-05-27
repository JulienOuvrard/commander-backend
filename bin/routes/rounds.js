"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const round_1 = require("../models/round");
class Rounds {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', function (req, res, next) {
            round_1.Round.find(function (err, products) {
                if (err)
                    return next(err);
                res.json(products);
            });
        });
        this.router.get('/:id', function (req, res, next) {
            round_1.Round.findById(req.params.id, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.post('/', function (req, res, next) {
            round_1.Round.create(req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.put('/:id', function (req, res, next) {
            round_1.Round.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.delete('/:id', function (req, res, next) {
            round_1.Round.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
    }
}
exports.default = new Rounds().router;
//# sourceMappingURL=rounds.js.map