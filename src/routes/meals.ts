import * as express from 'express';
import * as mongoose from 'mongoose';
import { Meal } from '../models/meal';

class Meals {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {
        /* GET ALL MealS */
        this.router.get('/', function (req, res, next) {
            Meal.find(function (err, products) {
                if (err) return next(err);
                res.json(products);
            });
        });

        /* GET SINGLE Meal BY ID */
        this.router.get('/:id', function (req, res, next) {
            Meal.findById(req.params.id, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* SAVE Meal */
        this.router.post('/', function (req, res, next) {
            Meal.create(req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* UPDATE Meal */
        this.router.put('/:id', function (req, res, next) {
            Meal.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* DELETE Meal */
        this.router.delete('/:id', function (req, res, next) {
            Meal.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });
    }
}

export default new Meals().router;