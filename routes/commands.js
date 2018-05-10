var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Command = require('../models/Command.js');

/* GET ALL CommandS */
router.get('/', function (req, res, next) {
    Command.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE Command BY ID */
router.get('/:id', function (req, res, next) {
    Command.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Command */
router.post('/', function (req, res, next) {
    Command.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Command */
router.put('/:id', function (req, res, next) {
    Command.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Command */
router.delete('/:id', function (req, res, next) {
    Command.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;