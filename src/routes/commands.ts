import * as express from 'express';
import * as mongoose from 'mongoose';
import { Command } from '../models/command';

class Commands {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {
        /* GET ALL CommandS */
        this.router.get('/', function (req, res, next) {
            Command.find(function (err, products) {
                if (err) return next(err);
                res.json(products);
            });
        });

        /* GET SINGLE Command BY ID */
        this.router.get('/:id', function (req, res, next) {
            Command.findById(req.params.id, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* SAVE Command */
        this.router.post('/', function (req, res, next) {
            Command.create(req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* UPDATE Command */
        this.router.put('/:id', function (req, res, next) {
            Command.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* DELETE Command */
        this.router.delete('/:id', function (req, res, next) {
            Command.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });
    }
}

export default new Commands().router;