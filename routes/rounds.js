var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Round = require('../models/Round.js');

/* GET ALL RoundS */
router.get('/', function (req, res, next) {
    Round.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE Round BY ID */
router.get('/:id', function (req, res, next) {
    Round.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Round */
router.post('/', function (req, res, next) {
    Round.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Round */
router.put('/:id', function (req, res, next) {
    Round.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Round */
router.delete('/:id', function (req, res, next) {
    Round.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;