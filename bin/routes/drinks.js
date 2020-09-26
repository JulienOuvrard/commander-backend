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
        this.router.get('/export', function (req, res, next) {
            drink_1.Drink.find(function (err, products) {
                if (err)
                    return next(err);
                res.writeHead(200, {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachement; filename=drinks_export.csv'
                });
                res.end(this.dataToCSV(products, [{ key: 'name', label: 'name' }, { key: 'category', label: 'category' }, { key: 'price', label: 'price' }]));
            }.bind(this));
        }.bind(this));
        this.router.get('/categories', function (req, res, next) {
            drink_1.Drink.distinct('category', function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.get('/groupBy/:key', function (req, res, next) {
            drink_1.Drink.aggregate()
                .group({
                _id: `$${req.params.key}`,
                drinks: { $push: '$$ROOT' }
            })
                .exec(function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
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
    dataToCSV(dataList, headers) {
        const allObj = [];
        const headerLabels = headers.map(header => header.label);
        const headerKeys = headers.map(header => header.key);
        allObj.push(headerLabels);
        dataList.forEach(obj => {
            const wantedData = [];
            headerKeys.forEach(hKey => {
                wantedData.push(obj[hKey]);
            });
            allObj.push(wantedData);
        });
        const strData = allObj.map(aObj => aObj.join(','));
        return strData.join('\n');
    }
}
exports.default = new Drinks().router;
//# sourceMappingURL=drinks.js.map