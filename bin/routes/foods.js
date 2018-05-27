"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const csv = require("fast-csv");
const food_1 = require("../models/food");
class Foods {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', function (req, res, next) {
            food_1.Food.find(function (err, products) {
                if (err)
                    return next(err);
                res.json(products);
            });
        });
        this.router.get('/:id', function (req, res, next) {
            food_1.Food.findById(req.params.id, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.post('/', function (req, res, next) {
            food_1.Food.create(req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.put('/:id', function (req, res, next) {
            food_1.Food.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.delete('/:id', function (req, res, next) {
            food_1.Food.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.post('/import', function (req, res, next) {
            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }
            const foodFile = req.files.file;
            const foods = [];
            csv
                .fromString(foodFile.data.toString(), {
                headers: true,
                ignoreEmpty: true
            })
                .on("data", function (data) {
                data['_id'] = new mongoose.Types.ObjectId();
                foods.push(data);
            })
                .on("end", function () {
                food_1.Food.create(foods, function (err, post) {
                    if (err)
                        return next(err);
                    res.json(post);
                });
            });
        });
    }
}
exports.default = new Foods().router;
//# sourceMappingURL=foods.js.map