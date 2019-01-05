import * as express from 'express';
import * as mongoose from 'mongoose';
import { Drink } from '../models/drink';
import { Food } from '../models/food';
import { Command } from '../models/command';
import { Meal } from '../models/meal';
import { Round } from '../models/round';

class Dashboard {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {
        
        this.router.get('/commands/paid', function (req, res, next) {
            Command.aggregate().
            group({ _id: "$isPaid", count: { $sum: 1 } }).
            // project('-_id count').
            exec(function (err, products) {
                if (err) return next(err);
                res.json(products);
            });
        });

        
    }
}

export default new Dashboard().router;