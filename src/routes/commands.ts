import * as express from 'express';
import * as mongoose from 'mongoose';
import * as pdf from 'html-pdf';
import * as path from 'path';
import * as fs from 'fs';
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

        /* GET SINGLE Command description*/
        this.router.get('/:id/description', function (req, res, next) {
            Command.findById(req.params.id).populate('rounds').populate('meals').exec(function (err, post) {
                if (err) return next(err);

                if(post) {
                    res.json(post.description());
                }
            })
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

        this.router.post('/:id/print', function (req, res, next) {
            Command.findById(req.params.id, function (err, post) {
                if (err) return next(err);

                if (post) {
                    const html = fs.readFileSync(path.join(__dirname, '..', 'template/print.template.html'), 'utf8')
                                    .replace('{{title}}', 'Command')
                                    .replace('{{content}}', this.commandDescHtml(req.body));
                    console.log(html);
                    const options = {
                        "width": '80mm',
                        "height": '200mm',
                        "header": {
                            "height": '20mm',
                            "contents": '<div style="text-align: center;">Café de la Gare</div>'
                        },
                    }
                    const filename = path.join(__dirname, '..', 'receipt', `${post.id}.pdf`);
                    pdf
                    .create(html, options)
                    .toFile(filename, (err, file)=> {
                        if (err) {
                            return next(err.stack)
                        }

                        res.json(file);
                    });
                }

            }.bind(this))
        }.bind(this))
    }

    private commandDescHtml(commandDesc: any[]): string {
        let totalPrice = 0;
        const indentDesc = commandDesc.map(elt => {
            totalPrice += elt.price;
            const price = this.formatPrice(elt.price.toString());
            return `<tr>
            <td>${elt.detail}</td>
            <td>${price}€</td>
            </tr>`
        }).join('');
        const total = `<tr><td>Total</td><td>${this.formatPrice(totalPrice.toString())}€</td></tr>`
        return `<table>${indentDesc}${total}</table>`;
    }

    private formatPrice(price: string) : string {
        const tok = price.split('.');
        const resTok: string[] = [];
        if(tok[0]){
            if(tok[0].length===1){
                resTok.push(' '+tok[0]);
            } else if(tok[0].length===0){
                resTok.push(' 0');
            } else {
                resTok.push(tok[0]);
            }
        } else {
            resTok.push(' 0');
        }
        if(tok[1]){
            if(tok[1].length===1){
                resTok.push(tok[1]+'0');
            } else if(tok[1].length===0){
                resTok.push('00');
            } else {
                resTok.push(tok[1]);
            }
        } else {
            resTok.push('00');
        }
        return resTok.join('.');
    }
}

export default new Commands().router;