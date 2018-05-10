var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Drink = require('../models/Drink.js');

/* GET ALL DrinkS */
router.get('/', function (req, res, next) {
    Drink.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE Drink BY ID */
router.get('/:id', function (req, res, next) {
    Drink.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Drink */
router.post('/', function (req, res, next) {
    Drink.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Drink */
router.put('/:id', function (req, res, next) {
    Drink.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Drink */
router.delete('/:id', function (req, res, next) {
    Drink.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;