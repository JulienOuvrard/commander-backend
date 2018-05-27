"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const csv = require("fast-csv");
const drink_1 = require("../models/drink");
class Drinks {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', function (req, res, next) {
            drink_1.Drink.find(function (err, products) {
                if (err)
                    return next(err);
                res.json(products);
            });
        });
        this.router.get('/:id', function (req, res, next) {
            drink_1.Drink.findById(req.params.id, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.post('/', function (req, res, next) {
            drink_1.Drink.create(req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.put('/:id', function (req, res, next) {
            drink_1.Drink.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.delete('/:id', function (req, res, next) {
            drink_1.Drink.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.post('/import', function (req, res, next) {
            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }
            const drinkFile = req.files.file;
            const drinks = [];
            csv
                .fromString(drinkFile.data.toString(), {
                headers: true,
                ignoreEmpty: true
            })
                .on("data", function (data) {
                data['_id'] = new mongoose.Types.ObjectId();
                drinks.push(data);
            })
                .on("end", function () {
                drink_1.Drink.create(drinks, function (err, post) {
                    if (err)
                        return next(err);
                    res.json(post);
                });
            });
        });
    }
}
exports.default = new Drinks().router;
//# sourceMappingURL=drinks.js.map