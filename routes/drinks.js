var express = require('express');
var csv = require('fast-csv');
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

/* Import CSV file */
router.post('/import', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var drinkFile = req.files.file;
    var drinks = [];

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
            Drink.create(drinks, function (err, post) {
                if (err) return next(err);
                res.json(post);
                //res.send(drinks.length + ' drinks have been successfully uploaded.');
            });
        });
});

module.exports = router;