"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const convertHTMLToPDF = require('pdf-puppeteer');
const path = require("path");
const fs = require("fs");
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
        this.router.get('/:id/description', function (req, res, next) {
            command_1.Command.findById(req.params.id).populate('rounds').populate('meals').exec(function (err, post) {
                if (err)
                    return next(err);
                if (post) {
                    res.json(post.description());
                }
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
        this.router.post('/:id/print', function (req, res, next) {
            command_1.Command.findById(req.params.id, function (err, post) {
                if (err)
                    return next(err);
                if (post) {
                    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
                    const contentDesc = this.commandDescHtml(req.body);
                    const html = fs.readFileSync(path.join(__dirname, '..', 'template/print.template.html'), 'utf8')
                        .replace('{{title}}', 'Command')
                        .replace('{{date}}', today)
                        .replace('{{content}}', contentDesc);
                    const filename = path.join(__dirname, '..', 'receipt', `${post.id}.pdf`);
                    const options = {
                        "path": filename,
                        "width": '80mm',
                        "height": '200mm',
                    };
                    convertHTMLToPDF(html, (pdf) => {
                        res.json({ filename });
                    }, options, null, false);
                }
            }.bind(this));
        }.bind(this));
    }
    commandDescHtml(commandDesc) {
        let totalPrice = 0;
        const indentDesc = commandDesc.map(elt => {
            totalPrice += elt.price;
            const price = this.formatPrice(elt.price.toString());
            return `<tr>
            <td>${elt.detail}</td>
            <td>${price}€</td>
            </tr>`;
        }).join('');
        const total = `<tr><td>Total</td><td>${this.formatPrice(totalPrice.toString())}€</td></tr>`;
        return `<table>${indentDesc}${total}</table>`;
    }
    formatPrice(price) {
        const tok = price.split('.');
        const resTok = [];
        if (tok[0]) {
            if (tok[0].length === 1) {
                resTok.push(' ' + tok[0]);
            }
            else if (tok[0].length === 0) {
                resTok.push(' 0');
            }
            else {
                resTok.push(tok[0]);
            }
        }
        else {
            resTok.push(' 0');
        }
        if (tok[1]) {
            if (tok[1].length === 1) {
                resTok.push(tok[1] + '0');
            }
            else if (tok[1].length === 0) {
                resTok.push('00');
            }
            else {
                resTok.push(tok[1]);
            }
        }
        else {
            resTok.push('00');
        }
        return resTok.join('.');
    }
}
exports.default = new Commands().router;
//# sourceMappingURL=commands.js.map