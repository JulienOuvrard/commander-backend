"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const command_1 = require("../models/command");
class Commands {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', function (req, res, next) {
            command_1.Command.find(function (err, products) {
                if (err)
                    return next(err);
                res.json(products);
            });
        });
        this.router.get('/:id', function (req, res, next) {
            command_1.Command.findById(req.params.id, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.get('/:id/desciption', function (req, res, next) {
            command_1.Command.findById(req.params.id, function (err, post) {
                if (err)
                    return next(err);
                const desc = post ? post.description() : '';
                res.json(desc);
            });
        });
        this.router.post('/', function (req, res, next) {
            command_1.Command.create(req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.put('/:id', function (req, res, next) {
            command_1.Command.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
        this.router.delete('/:id', function (req, res, next) {
            command_1.Command.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err)
                    return next(err);
                res.json(post);
            });
        });
    }
}
exports.default = new Commands().router;
//# sourceMappingURL=commands.js.map