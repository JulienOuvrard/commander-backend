var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Meal = require('../models/Meal.js');

/* GET ALL MealS */
router.get('/', function (req, res, next) {
    Meal.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE Meal BY ID */
router.get('/:id', function (req, res, next) {
    Meal.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Meal */
router.post('/', function (req, res, next) {
    Meal.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Meal */
router.put('/:id', function (req, res, next) {
    Meal.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Meal */
router.delete('/:id', function (req, res, next) {
    Meal.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;