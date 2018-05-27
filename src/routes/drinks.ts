import * as express from 'express';
import * as mongoose from 'mongoose';
import * as csv from 'fast-csv';
import { UploadedFile } from 'express-fileupload';
import { Drink } from '../models/drink';

class Drinks {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {
        /* GET ALL DrinkS */
        this.router.get('/', function (req, res, next) {
            Drink.find(function (err, products) {
                if (err) return next(err);
                res.json(products);
            });
        });

        /* GET SINGLE Drink BY ID */
        this.router.get('/:id', function (req, res, next) {
            Drink.findById(req.params.id, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* SAVE Drink */
        this.router.post('/', function (req, res, next) {
            Drink.create(req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* UPDATE Drink */
        this.router.put('/:id', function (req, res, next) {
            Drink.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* DELETE Drink */
        this.router.delete('/:id', function (req, res, next) {
            Drink.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* Import CSV file */
        this.router.post('/import', function (req, res, next) {
            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }
            const drinkFile: UploadedFile = <UploadedFile> req.files.file;
            const drinks: Array<string | Buffer> = [];

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
    }
}

export default new Drinks().router;