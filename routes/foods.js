var express = require('express');
var csv = require('fast-csv');
var router = express.Router();
var mongoose = require('mongoose');
var Food = require('../models/Food.js');

/* GET ALL FoodS */
router.get('/', function (req, res, next) {
    Food.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE Food BY ID */
router.get('/:id', function (req, res, next) {
    Food.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Food */
router.post('/', function (req, res, next) {
    Food.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE Food */
router.put('/:id', function (req, res, next) {
    Food.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE Food */
router.delete('/:id', function (req, res, next) {
    Food.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* Import CSV file */
router.post('/import', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var foodFile = req.files.file;
    var foods = [];

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
            Food.create(foods, function (err, documents) {
                if (err) return next(err);
                res.json(post);
                //res.send(foods.length + ' foods have been successfully uploaded.');
            });
        });
});

module.exports = router;