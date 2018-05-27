import * as express from 'express';
import * as mongoose from 'mongoose';
import * as csv from 'fast-csv';
import { UploadedFile } from 'express-fileupload';
import { Food } from '../models/food';

class Foods {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {
        /* GET ALL FoodS */
        this.router.get('/', function (req, res, next) {
            Food.find(function (err, products) {
                if (err) return next(err);
                res.json(products);
            });
        });

        /* GET SINGLE Food BY ID */
        this.router.get('/:id', function (req, res, next) {
            Food.findById(req.params.id, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* SAVE Food */
        this.router.post('/', function (req, res, next) {
            Food.create(req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* UPDATE Food */
        this.router.put('/:id', function (req, res, next) {
            Food.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* DELETE Food */
        this.router.delete('/:id', function (req, res, next) {
            Food.findByIdAndRemove(req.params.id, req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* Import CSV file */
        this.router.post('/import', function (req, res, next) {
            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }
            const foodFile: UploadedFile = <UploadedFile>req.files.file;
            const foods: Array<string | Buffer> = [];

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
                    Food.create(foods, function (err, post) {
                        if (err) return next(err);
                        res.json(post);
                        //res.send(foods.length + ' foods have been successfully uploaded.');
                    });
                });
        });
    }
}

export default new Foods().router;