"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.RoundSchema = new mongoose_1.Schema({
    drinks: [{
            drinkId: mongoose_1.SchemaTypes.ObjectId,
            name: { type: String },
            quantity: { type: Number }
        }],
    isPaid: { type: Boolean },
    price: { type: Number },
    created: { type: Date },
    updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'rounds'
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
exports.Round = mongoose_1.model('Round', exports.RoundSchema);
//# sourceMappingURL=round.js.map