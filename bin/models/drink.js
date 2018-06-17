"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.DrinkSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 0, required: true },
    currency: { type: String, default: "EUR", required: true },
    created: { type: Date },
    updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'drinks'
}).pre('save', function (next) {
    let document = this;
    let now = new Date();
    if (!document.created) {
        document.created = now;
    }
    document.updated = now;
    next();
}).pre('update', function (next) {
    next();
});
exports.Drink = mongoose_1.model('Drink', exports.DrinkSchema);
//# sourceMappingURL=drink.js.map