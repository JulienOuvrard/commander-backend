"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const meal_1 = require("../models/meal");
class Meals {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', function (req, res, next) {
            meal_1.Meal.find(function (err, products) {
                if (err)
                    return next(err);
                res.json(products);
            });
        });
        this.router.get('/:id', function (req, res, next) {
            meal_1.Meal.findById(req.params.id, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.post('/', function (req, res, next) {
            meal_1.Meal.create(req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.put('/:id', function (req, res, next) {
            meal_1.Meal.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.delete('/:id', function (req, res, next) {
            meal_1.Meal.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
    }
}
exports.default = new Meals().router;
//# sourceMappingURL=meals.js.map