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

        /* GET Export file to csv */
        this.router.get('/export', function (req, res, next) {
            Food.find(function (err, products) {
                if (err) return next(err);
                res.writeHead(200, {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachement; filename=foods_export.csv'
                });
                res.end(this.dataToCSV(products, [{key: 'name' , label: 'name'}, {key: 'category' , label: 'category'}, {key: 'price' , label: 'price'}]))
            }.bind(this));
        }.bind(this));

        /* GET Categories of Drinks */
        this.router.get('/categories', function (req, res, next) {
            Food.distinct('category', function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });

        /* GET drinks grouped by key */
        this.router.get('/groupBy/:key', function (req, res, next) {
            Food.aggregate()
            .group({
                _id: `$${req.params.key}`,
                foods: { $push: '$$ROOT'}
            })
            .exec(function (err, post) {
                if (err) return next(err);
                res.json(post);
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
                    if(data['ingredients']){
                        data['ingredients'] = data['ingredients'].split('|');
                    }
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