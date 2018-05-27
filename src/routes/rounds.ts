import * as express from 'express';
import * as mongoose from 'mongoose';
import { Round } from '../models/round';

class Rounds {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {
        /* GET ALL RoundS */
        this.router.get('/', function (req, res, next) {
            Round.find(function (err, products) {
                if (err) return next(err);
                res.json(products);
            });
        });

        /* GET SINGLE Round BY ID */
        this.router.get('/:id', function (req, res, next) {
            Round.findById(req.params.id, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* SAVE Round */
        this.router.post('/', function (req, res, next) {
            Round.create(req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* UPDATE Round */
        this.router.put('/:id', function (req, res, next) {
            Round.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* DELETE Round */
        this.router.delete('/:id', function (req, res, next) {
            Round.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });
    }
}

export default new Rounds().router;